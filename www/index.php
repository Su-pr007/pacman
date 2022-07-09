<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>PacMan</title>
	<link rel="stylesheet" href="styles.css">
	<script defer type="module" src="js/main.js"></script>
</head>
<body>
	<header>
		<div class="info-bar">
			<div class="eaten-ghosts">Съедено приведений: <span id="eatenScore">0</span></div>
			<div class="character-size">Твой размер: <span id="characterSize">20</span></div>
		</div>
	</header>
	<canvas id="canvas"></canvas>
</body>
</html>