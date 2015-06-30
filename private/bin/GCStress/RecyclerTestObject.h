/********************************************************
*                                                       *
*   Copyright (C) Microsoft. All rights reserved.       *
*                                                       *
********************************************************/
#include "stdafx.h"

class RecyclerTestObject : public FinalizableObject
{
protected:
    RecyclerTestObject() 
    {
        generation = currentGeneration;
    }

public:
    // FinalizableObject implementation
    virtual void Finalize(bool isShutdown) override { VerifyCondition(false); };
    virtual void Dispose(bool isShutdown) override { VerifyCondition(false); };
    virtual void Mark(Recycler * recycler) override { VerifyCondition(false); };

public:
    static void BeginWalk()
    {
        currentGeneration++;

        walkObjectCount = 0;
        walkScannedByteCount = 0;
        walkBarrierByteCount = 0;
        walkTrackedByteCount = 0;
        walkLeafByteCount = 0;
        maxWalkDepth = 0;

        currentWalkDepth = 0;

        wprintf(L"-------------------------------------------\n");
        wprintf(L"Full heap walk starting\n");
    }
    
    static void WalkReference(RecyclerTestObject * object)
    {
        if (object != nullptr)
        {
            // See if we've already seen the location in this traversal.
            if (object->generation != currentGeneration)
            {
                // Haven't see it yet.  Must be from the previous generation; increment generation and validate that.
                // Update to current generation to indicate we've seen it
                object->generation++;
                VerifyCondition(object->generation == currentGeneration);

                walkObjectCount++;
                
                currentWalkDepth++;
                maxWalkDepth = max(currentWalkDepth, maxWalkDepth);

                // Call virtual for object-specific behavior
                object->DoWalkObject();

                currentWalkDepth--;
            }
        }
    }

    static void EndWalk()
    {
        VerifyCondition(currentWalkDepth == 0);

        wprintf(L"Full heap walk finished\n");
        wprintf(L"Object Count:   %12d\n", walkObjectCount);
        wprintf(L"Scanned Bytes:  %12d\n", walkScannedByteCount);
        wprintf(L"Barrier Bytes:  %12d\n", walkBarrierByteCount);
        wprintf(L"Tracked Bytes:  %12d\n", walkTrackedByteCount);
        wprintf(L"Leaf Bytes:     %12d\n", walkLeafByteCount);
        wprintf(L"Total Bytes:    %12d\n", walkScannedByteCount + walkBarrierByteCount + walkTrackedByteCount + walkLeafByteCount);
        wprintf(L"Max Depth:      %12d\n", maxWalkDepth);
    }

    // Virtual methods
    virtual bool TryGetRandomLocation(Location * location)
    {
        // Return false to indicate no internal locations
        // Subclasses can override this to handle their internal locations as appropriate
        return false;
    }

    virtual void DoWalkObject() = 0;

protected:
    // Global variables
    
    // This global variable contains the "generation" of GC objects
    // It is used to validate the correctness of GC objects
    // It is assigned initially during object creation, and 
    // updated when we walk the entire object graph in TraverseAllObjects
    static size_t currentGeneration;

    // These globals contain statistical data generated by WalkAllReferences
    static size_t walkObjectCount;
    static size_t walkScannedByteCount;
    static size_t walkLeafByteCount;
    static size_t walkBarrierByteCount;
    static size_t walkTrackedByteCount;
    static size_t currentWalkDepth;
    static size_t maxWalkDepth;

private:
    // Instance variables
    
    // See comments above re currentGeneration
    size_t generation;
};

template <unsigned int minCount, unsigned int maxCount>
class LeafObject : public RecyclerTestObject
{
private:
    LeafObject(unsigned int count) :
        count(count)
    {
        for (unsigned int i = 0; i < count; i++)
        {
            data[i] = i;
        }
    }
    
public:
    static RecyclerTestObject * New()
    {
        unsigned int count = minCount + GetRandomInteger(maxCount - minCount + 1);
        
        return RecyclerNewPlusLeaf(recycler, sizeof(size_t) * count, LeafObject, count);
    }

protected:
    virtual void DoWalkObject() override
    {
        walkLeafByteCount += sizeof(LeafObject) + count * sizeof(size_t);
    }

private:
    unsigned int count;
    size_t data[0];
};

template <unsigned int minCount, unsigned int maxCount>
class ScannedObject : public RecyclerTestObject
{
private:
    ScannedObject(unsigned int count) :
        count(count)
    {
        for (unsigned int i = 0; i < count; i++)
        {
            references[i] = nullptr;
        }
    }
    
public:
    static RecyclerTestObject * New()
    {
        unsigned int count = minCount + GetRandomInteger(maxCount - minCount + 1);
        
        return RecyclerNewPlus(recycler, sizeof(RecyclerTestObject *) * count, ScannedObject, count);
    }

    virtual bool TryGetRandomLocation(Location * location) override
    {
        // Get a random slot and construct a Location for it
        *location = Location::Scanned(&references[GetRandomInteger(count)]);

        return true;
    }

protected:
    virtual void DoWalkObject() override
    {
        walkScannedByteCount += sizeof(ScannedObject) + count * sizeof(RecyclerTestObject *);

        for (unsigned int i = 0; i < count; i++)
        {
            RecyclerTestObject::WalkReference(references[i]);
        }
    }
    
private:
    unsigned int count;
    RecyclerTestObject * references[0];
};

template <unsigned int minCount, unsigned int maxCount>
class BarrierObject : public RecyclerTestObject
{
private:
    BarrierObject(unsigned int count) :
        count(count)
    {
        for (unsigned int i = 0; i < count; i++)
        {
            references[i] = nullptr;
        }
    }
    
public:
    static RecyclerTestObject * New()
    {
        unsigned int count = minCount + GetRandomInteger(maxCount - minCount + 1);
        
        return RecyclerNewWithBarrierPlus(recycler, sizeof(RecyclerTestObject *) * count, BarrierObject, count);
    }

    virtual bool TryGetRandomLocation(Location * location) override
    {
        // Get a random slot and construct a Location for it
        *location = Location::Barrier(&references[GetRandomInteger(count)]);

        return true;
    }

protected:
    virtual void DoWalkObject() override
    {
        walkBarrierByteCount += sizeof(BarrierObject) + count * sizeof(RecyclerTestObject *);

        for (unsigned int i = 0; i < count; i++)
        {
            RecyclerTestObject::WalkReference(references[i]);
        }
    }
    
private:
    unsigned int count;
    RecyclerTestObject * references[0];
};

template <unsigned int minCount, unsigned int maxCount>
class TrackedObject : public RecyclerTestObject
{
private:
    TrackedObject(unsigned int count) :
        count(count)
    {
        for (unsigned int i = 0; i < count; i++)
        {
            references[i] = nullptr;
        }
    }
    
public:
    static RecyclerTestObject * New()
    {
        unsigned int count = minCount + GetRandomInteger(maxCount - minCount + 1);
        
        return RecyclerNewTrackedLeafPlusZ(recycler, sizeof(RecyclerTestObject *) * count, TrackedObject, count);
    }

    virtual bool TryGetRandomLocation(Location * location) override
    {
        // Get a random slot and construct a Location for it
        *location = Location::Tagged(&references[GetRandomInteger(count)]);

        return true;
    }

    // Tracked object implementation
    virtual void Mark(Recycler * recycler) override 
    { 
        for (unsigned int i = 0; i < count; i++)
        {
            RecyclerTestObject * object = Location::Untag(references[i]);
            if (object != nullptr)
            {
                recycler->TryMarkNonInterior(object);
            }
        }
    };

    // Tracked objects are always finalize as well. Just do nothing.
    virtual void Finalize(bool isShutdown) override { }
    virtual void Dispose(bool isShutdown) override { };
    
    
protected:
    virtual void DoWalkObject() override
    {
        walkTrackedByteCount += sizeof(TrackedObject) + count * sizeof(RecyclerTestObject *);

        for (unsigned int i = 0; i < count; i++)
        {
            RecyclerTestObject::WalkReference(Location::Untag(references[i]));
        }
    }
    
private:
    unsigned int count;
    RecyclerTestObject * references[0];
};


