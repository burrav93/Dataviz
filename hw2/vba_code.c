Sub part1()

For Each ws In Worksheets
With ws

'Headers
Range("I1").Value = "Ticker"
Range("J1").Value = "Total_Stock_Volume"
Range("H1").Value = "Close Price For Each Stock"
Range("K1").Value = "Yearly Change"
Range("L1").Value = "Percent Change"


'Set Variables
Dim TickerVar As String
Dim TotalVolumeVar As Double
Dim StartRow As Integer
Dim LastRow As Double
Dim OpenPrice As Double
Dim ClosePrice As Double


'Intialize variables
TotalVolumeVar = 0
StartRow = 2

'Total # of Rows in sheet

LastRow = Cells(Rows.Count, 1).End(xlUp).Row


'Looping through Rows to generate values for Ticker and Total_Stock_Volume Columns

For i = 2 To LastRow

   'check if it's still the same ticker
   If Cells(i, 1).Value = Cells(i + 1, 1).Value Then
   'Sum the TotalVolume
   TotalVolumeVar = TotalVolumeVar + Cells(i + 1, 7).Value

   Else
   'set ticker variable
   TickerVar = Cells(i, 1).Value


   'Print Values for Ticker and Total_Stock_Volume Columns
   Cells(StartRow, "I").Value = TickerVar
   Cells(StartRow, "J").Value = TotalVolumeVar

   'closing price at the end of year

   ClosePrice = Cells(i, 6).Value
   Range("K" & StartRow) = ClosePrice

   'to get Yearly change and % Change for each stocks

   If Cells(i, 1).Value = Range("I" & StartRow).Value Then
   OpenPrice = Cells(i, 3).Value
   Range("K" & StartRow) = ClosePrice - OpenPrice
       If OpenPrice = 0 Then
       Range("L" & StartRow) = 0
       Else
       Range("L" & StartRow) = (ClosePrice - OpenPrice) / OpenPrice * 100 & "%"
       End If
   'Counter
   StartRow = StartRow + 1
   End If
   'Reset Total Volume
   TotalVolumeVar = 0


End If

Next i




'Count the number of stocks'
NumberStockRow = Cells(Rows.Count, 9).End(xlUp).Row




'Conditional formatting to highlight positive change in green and negative change in red

For i = 2 To NumberStockRow:
   If Cells(i, 11).Value > 0 Then
   Cells(i, 11).Interior.ColorIndex = 4
   ElseIf Cells(i, 11).Value < 0 Then
   Cells(i, 11).Interior.ColorIndex = 3
   End If
Next i

End With
Next ws


End Sub