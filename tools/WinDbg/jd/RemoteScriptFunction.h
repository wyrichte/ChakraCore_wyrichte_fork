//---------------------------------------------------------------------------
// Copyright (C) Microsoft. All rights reserved.
//----------------------------------------------------------------------------
#pragma once

class RemoteScriptFunction : public RemoteJavascriptFunction
{
public:
    RemoteScriptFunction();
    RemoteScriptFunction(ULONG64 ptr);
    RemoteScriptFunction(JDRemoteTyped const& scriptFunction);
        
    RemoteFunctionBody GetFunctionBody();
    void PrintNameAndNumberWithLink();
};
