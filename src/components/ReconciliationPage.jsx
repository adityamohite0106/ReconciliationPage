import React, { useState } from 'react';
import './Reconciliation.css';

const ReconciliationPage = () => {
  const [date, setDate] = useState('21-08-2025');
  const [dateValue, setDateValue] = useState('2025-08-21'); // For HTML5 date input (yyyy-mm-dd format)
  const [clientFile, setClientFile] = useState(null);
  const [cashfreeFile, setCashfreeFile] = useState(null);
  const [apiUserRechargeFile, setApiUserRechargeFile] = useState(null);
  const [instantPayFile, setInstantPayFile] = useState(null);
  const [results, setResults] = useState('');

  // Convert dd-mm-yyyy to yyyy-mm-dd
  const convertToHTMLDateFormat = (dateString) => {
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
  };

  // Convert yyyy-mm-dd to dd-mm-yyyy
  const convertToDisplayFormat = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  const handleDateChange = (e) => {
    const htmlDateValue = e.target.value; // yyyy-mm-dd format
    const displayDateValue = convertToDisplayFormat(htmlDateValue); // dd-mm-yyyy format
    
    setDateValue(htmlDateValue);
    setDate(displayDateValue);
  };

  const handleTextDateChange = (e) => {
    const textValue = e.target.value;
    setDate(textValue);
    
    // Try to convert text input to HTML date format
    const dateRegex = /^(\d{2})-(\d{2})-(\d{4})$/;
    if (dateRegex.test(textValue)) {
      const htmlFormat = convertToHTMLDateFormat(textValue);
      setDateValue(htmlFormat);
    }
  };

  const handleFileChange = (setter) => (event) => {
    const file = event.target.files[0];
    setter(file);
  };

  const handleImportClientFile = () => {
    if (clientFile) {
      alert(`Importing client file: ${clientFile.name}`);
    } else {
      alert('Please select a client file first');
    }
  };

  const handleImportCashfree = () => {
    if (cashfreeFile) {
      alert(`Importing Cashfree file: ${cashfreeFile.name}`);
    } else {
      alert('Please select a Cashfree file first');
    }
  };

  const handleImportApiUserRecharge = () => {
    if (apiUserRechargeFile) {
      alert(`Importing API User Recharge file: ${apiUserRechargeFile.name}`);
    } else {
      alert('Please select an API User Recharge file first');
    }
  };

  const handleImportInstantPay = () => {
    if (instantPayFile) {
      alert(`Importing InstantPay file: ${instantPayFile.name}`);
    } else {
      alert('Please select an InstantPay file first');
    }
  };

  const handleReconcile = () => {
    if (!clientFile) {
      alert('Please import client transactions first');
      return;
    }
    
    setResults('Reconciliation completed successfully!\n\nMatched transactions: 150\nUnmatched transactions: 5\nTotal processed: 155');
    alert('Reconciliation process completed!');
  };

  const handleExportUnmatched = () => {
    if (!results) {
      alert('Please run reconciliation first');
      return;
    }
    
    // Create a sample CSV content
    const csvContent = 'Transaction ID,Date,Amount,Status\nTXN001,21-08-2025,1000,Unmatched\nTXN002,21-08-2025,500,Unmatched';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'unmatched_transactions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="reconciliation-container">
      <div className="content">
        <h1 className="page-title">Reconciliation</h1>

        <div className="date-section">
          <label htmlFor="date">Date (dd-MM-yyyy):</label>
          <div className="date-input-group">
        
            <input
              type="date"
              value={dateValue}
              onChange={handleDateChange}
              className="date-picker"
              title="Choose date from calendar"
            />
          </div>
        </div>

        <div className="import-section">
          <h2>Import Client Transactions (All_txn_Data_Report))</h2>
          <div className="file-import-row">
            <input
              type="file"
              onChange={handleFileChange(setClientFile)}
              className="file-input"
              accept=".csv,.xlsx,.xls"
            />
            <button onClick={handleImportClientFile} className="import-btn primary">
              Import Client File
            </button>
          </div>
        </div>

        <div className="other-sources-section">
          <h2>Import Other Sources</h2>
          
          <div className="source-row">
            <label>Cashfree Transfer:</label>
            <input
              type="file"
              onChange={handleFileChange(setCashfreeFile)}
              className="file-input"
              accept=".csv,.xlsx,.xls"
            />
            <button onClick={handleImportCashfree} className="import-btn secondary">
              Import Cashfree
            </button>
          </div>

          <div className="source-row">
            <label>APIUserRechargeSearch:</label>
            <input
              type="file"
              onChange={handleFileChange(setApiUserRechargeFile)}
              className="file-input"
              accept=".csv,.xlsx,.xls"
            />
            <button onClick={handleImportApiUserRecharge} className="import-btn secondary">
              Import APIUserRechargeSearch
            </button>
          </div>

          <div className="source-row">
            <label>Instant Pay:</label>
            <input
              type="file"
              onChange={handleFileChange(setInstantPayFile)}
              className="file-input"
              accept=".csv,.xlsx,.xls"
            />
            <button onClick={handleImportInstantPay} className="import-btn secondary">
              Import InstantPay
            </button>
          </div>
        </div>

        <div className="action-buttons">
          <button onClick={handleReconcile} className="reconcile-btn">
            Reconcile
          </button>
          <button onClick={handleExportUnmatched} className="export-btn">
            Export Unmatched (CSV)
          </button>
        </div>

        {results && (
          <div className="results-section">
            <h3>Reconciliation Results:</h3>
            <pre className="results-text">{results}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReconciliationPage;