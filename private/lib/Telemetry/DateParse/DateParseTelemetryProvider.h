#pragma once

#ifdef TELEMETRY_DateParse

typedef JsUtil::BaseDictionary<const wchar_t*, uint32, ArenaAllocator, PowerOf2SizePolicy> StringHitCount;

class DateParseTelemetryProvider :
    public IScriptContextTelemetryProvider
{
private:
    ScriptContextTelemetry& scriptContextTelemetry;
    StringHitCount hitCount;

    ArenaAllocator allocator;

    uint32 successCount;
    uint32 failCount;

public:
    DateParseTelemetryProvider(ScriptContextTelemetry& scriptContextTelemetry);
    ~DateParseTelemetryProvider();

    void OutputPrint() override;
    void OutputTraceLogging() override;

    void JavascriptDate_ParseHelper( Js::ScriptContext* scriptContext, Js::JavascriptString* str, double returnValue, bool exceptionRaised );
};

#endif