//---------------------------------------------------------------------------
// Copyright (C) Microsoft. All rights reserved.
//----------------------------------------------------------------------------
#pragma once

// ---- Begin jd private commands implementation --------------------------------------------------
#ifdef JD_PRIVATE
// ------------------------------------------------------------------------------------------------
#include "RemotePageAllocator.h"

class RemoteRecycler
{
public:
    RemoteRecycler() {}
    RemoteRecycler(ExtRemoteTyped recycler) : recycler(recycler) {};    
    ExtRemoteTyped GetExtRemoteTyped() { return recycler; }

    template <typename Fn>
    void ForEachPageAllocator(PCSTR leafPageAllocatorName, Fn fn);
private:
    ExtRemoteTyped recycler;
};

template <typename Fn>
void RemoteRecycler::ForEachPageAllocator(PCSTR leafPageAllocatorName, Fn fn)
{
    fn(leafPageAllocatorName, RemotePageAllocator(recycler.Field("threadPageAllocator")));
    fn("WriteWatch", RemotePageAllocator(recycler.Field("recyclerPageAllocator")));
    if (recycler.HasField("recyclerLargeBlockPageAllocator"))
    {
        fn("WriteWatchL", RemotePageAllocator(recycler.Field("recyclerLargeBlockPageAllocator")));
    } 
    if (recycler.HasField("recyclerWithBarrierPageAllocator"))
    {
        fn("WriteBarrier", RemotePageAllocator(recycler.Field("recyclerWithBarrierPageAllocator")));
    }
    if (recycler.HasField("markStackPageAllocator"))
    {
        fn("MarkStack", RemotePageAllocator(recycler.Field("markStackPageAllocator")));
    }
    else
    {
        // MarkContext
        fn("MarkCxt", RemotePageAllocator(recycler.Field("markContext.pagePool.pageAllocator")));
        fn("ParaMarkCxt1", RemotePageAllocator(recycler.Field("parallelMarkContext1.pagePool.pageAllocator")));
        fn("ParaMarkCxt2", RemotePageAllocator(recycler.Field("parallelMarkContext2.pagePool.pageAllocator")));
        fn("ParaMarkCxt3", RemotePageAllocator(recycler.Field("parallelMarkContext3.pagePool.pageAllocator")));
    }  

    if (recycler.HasField("backgroundProfilerPageAllocator"))
    {
        fn("BGProfiler", RemotePageAllocator(recycler.Field("backgroundProfilerPageAllocator")));
    }
}
// ---- End jd private commands implementation ----------------------------------------------------
#endif //JD_PRIVATE
// ------------------------------------------------------------------------------------------------