function ExportButton() {
  function doExport(format) {
    const a = document.createElement('a');
    a.href = `/api/todos/export?format=${format}`;
    a.click();
  }

  return (
    <div>
      <button onClick={() => doExport('json')}>Export JSON</button>
      <button onClick={() => doExport('csv')}>Export CSV</button>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>Advanced Todo App</h1>
      <ExportButton />
    </div>
  );
}

export default App;
