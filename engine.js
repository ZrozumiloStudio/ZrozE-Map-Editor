        const canvas = document.getElementById('gridCanvas');
        const ctx = canvas.getContext('2d');
        const createBtn = document.getElementById('createBtn');
        const fileInput = document.getElementById('fileInput');
        const loadBtn = document.getElementById('loadBtn');

        const gridSize = 20;
        const cellSize = canvas.width / gridSize;

        let grid = [];
        for (let i = 0; i < gridSize; i++) {
            grid[i] = [];
            for (let j = 0; j < gridSize; j++) {
                grid[i][j] = 0; // 0 represents empty cell
            }
        }

        function drawGrid() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    ctx.beginPath();
                    ctx.rect(j * cellSize, i * cellSize, cellSize, cellSize);
                    ctx.fillStyle = grid[i][j] ? 'red' : 'white';
                    ctx.fill();
                    ctx.stroke();
                }
            }
        }

        canvas.addEventListener('click', function(event) {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            const cellX = Math.floor(mouseX / cellSize);
            const cellY = Math.floor(mouseY / cellSize);

            grid[cellY][cellX] = grid[cellY][cellX] ? 0 : 1; // Toggle cell state
            drawGrid();
        });

        createBtn.addEventListener('click', function() {
            const content = grid.map(row => `[${row.join(', ')}],`).join('\n');
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'ZrozEMAP.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });

        fileInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = function(e) {
                const content = e.target.result;
                const lines = content.trim().split('\n');
                grid = lines.map(line => line.match(/\d/g).map(Number));
                drawGrid();
            };
            reader.readAsText(file);
        });

        loadBtn.addEventListener('click', function() {
            fileInput.click();
        });

        drawGrid();
