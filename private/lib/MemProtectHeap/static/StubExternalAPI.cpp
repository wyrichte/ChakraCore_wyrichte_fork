//----------------------------------------------------------------------------
// Copyright (C) Microsoft. All rights reserved.
//----------------------------------------------------------------------------

#include "MemProtectHeapPch.h"

// TODO: REMOVE
__forceinline void js_memcpy_s(__bcount(sizeInBytes) void *dst, size_t sizeInBytes, __in_bcount(count) const void *src, size_t count)
{
    Assert((count) <= (sizeInBytes));
    if ((count) <= (sizeInBytes))
        memcpy((dst), (src), (count));
    else                              
        ReportFatalException(NULL, E_FAIL, Fatal_Internal_Error, 2);
}

__forceinline void js_wmemcpy_s(__ecount(sizeInWords) char16 *dst, size_t sizeInWords, __in_ecount(count) const char16 *src, size_t count)
{
    //Multiplication Overflow check
    Assert(count <= sizeInWords && count <= SIZE_MAX/sizeof(char16));
    if(!(count <= sizeInWords && count <= SIZE_MAX/sizeof(char16)))
    {
        ReportFatalException(NULL, E_FAIL, Fatal_Internal_Error, 2);
    }
    else
    {
        memcpy(dst, src, count * sizeof(char16));
    }
}

bool ConfigParserAPI::FillConsoleTitle(__ecount(cchBufferSize) LPWSTR buffer, size_t cchBufferSize, __in LPWSTR moduleName)
{
    swprintf_s(buffer, cchBufferSize, _u("Chakra GC: %d - %s"), GetCurrentProcessId(), moduleName);

    return true;
}

void ConfigParserAPI::DisplayInitialOutput(__in LPWSTR moduleName)
{
    Output::Print(_u("Chakra GC\n"));
    Output::Print(_u("INIT: PID        : %d\n"), GetCurrentProcessId());
    Output::Print(_u("INIT: DLL Path   : %s\n"), moduleName);
}

#ifdef ENABLE_JS_ETW
void EtwCallbackApi::OnSessionChange(ULONG /* controlCode */, PVOID /* callbackContext */)
{
    // Does nothing
}
#endif

// Include this file got get the default behavior for JsUtil::ExternalApi functions.
void JsUtil::ExternalApi::RecoverUnusedMemory()
{
}

bool JsUtil::ExternalApi::RaiseOutOfMemoryIfScriptActive()
{
    return false;
}

bool JsUtil::ExternalApi::RaiseStackOverflowIfScriptActive(Js::ScriptContext * scriptContext, PVOID returnAddress)
{
    return false;
}

ThreadContextId JsUtil::ExternalApi::GetCurrentThreadContextId()
{
    return (ThreadContextId)::GetCurrentThreadId();
}

bool JsUtil::ExternalApi::RaiseOnIntOverflow()
{
    return false;
}

LPWSTR JsUtil::ExternalApi::GetFeatureKeyName()
{
    return  _u("Software\\Microsoft\\Internet Explorer\\ChakraRecycler");
}

#if DBG || defined(EXCEPTION_CHECK)
BOOL JsUtil::ExternalApi::IsScriptActiveOnCurrentThreadContext()
{
    return false;
}
#endif


extern "C"
{
    bool IsMessageBoxWPresent()
    {
        return true;
    }
}

bool GetDeviceFamilyInfo(
    _Out_opt_ ULONGLONG* /*pullUAPInfo*/,
    _Out_opt_ ULONG* /*pulDeviceFamily*/,
    _Out_opt_ ULONG* /*pulDeviceForm*/);

void
ChakraBinaryAutoSystemInfoInit(AutoSystemInfo * autoSystemInfo)
{
    ULONGLONG UAPInfo;
    ULONG DeviceFamily;
    ULONG DeviceForm;
    if (GetDeviceFamilyInfo(&UAPInfo, &DeviceFamily, &DeviceForm))
    {
        bool isMobile = (DeviceFamily == 0x00000004 /*DEVICEFAMILYINFOENUM_MOBILE*/);
        autoSystemInfo->shouldQCMoreFrequently = isMobile;
        autoSystemInfo->supportsOnlyMultiThreadedCOM = isMobile;  //TODO: pick some other platform to the list
        autoSystemInfo->isLowMemoryDevice = isMobile;  //TODO: pick some other platform to the list
    }
}

UINT_PTR
Math::Rand()
{
    unsigned int rand;
    rand_s(&rand);
    UINT_PTR newRand = static_cast<UINT_PTR>(rand);

#if TARGET_64
    rand_s(&rand);
    newRand |= static_cast<UINT_PTR>(rand) << 32;
#endif

    return newRand;
}

namespace Js
{
    void GCTelemetry::LogGCPauseStartTime() {};
    void GCTelemetry::LogGCPauseEndTime() {};
};
