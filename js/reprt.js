document.getElementById('upload-button').addEventListener('click', function() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const data = event.target.result;
            parseData(data);
        };
        reader.readAsText(file);
    } else {
        alert('请选择一个文件');
    }
});

function parseData(data) {
    const lines = data.split('\n');
    const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // 清空表格内容
    lines.forEach(line => {
        const cols = line.split(',');
        const row = tableBody.insertRow();
        cols.forEach(col => {
            const cell = row.insertCell();
            cell.textContent = col;
        });
    });
    generateSummary();
}

function generateSummary() {
    const summaryDiv = document.getElementById('summary');
    summaryDiv.innerHTML = '<p>这是自动生成的财报分析摘要。</p>';
}
