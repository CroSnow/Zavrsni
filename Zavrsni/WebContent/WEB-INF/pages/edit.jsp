<%@ page language="java" contentType="text/html;charset=UTF-8"
	pageEncoding="UTF-8" import="hr.fer.projekt.komponente.model.Component"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
    Component komponenta = (Component) request
					.getAttribute("komponenta");
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;  charset=utf-8">
<link type="text/css" rel="stylesheet" href="css/component.css" />
<title>Definiranje komponente</title>
<script type='text/javascript' src='js/utility.js'></script>
<script type='text/javascript' src='js/canvas-state.js'></script>
<script type="text/javascript" src='js/figures.js'></script>
<script type="text/javascript" src='js/test-script.js'></script>
<script type="text/javascript" src='js/init.js'></script>
<%
    if (komponenta != null) {
%>
<script type="text/javascript">
    var componentName = '${komponenta.name}';
    var loadedData = '${komponenta.data}';
</script>
<%
		if (komponenta.getAuthor().equals(session.getAttribute("korisnik"))) {
%>
<script type="text/javascript">
    id = ${komponenta.id}
</script>

<%
		} else {
%>
<script type="text/javascript">
    id = null;
</script>
<%
		} 
    } else {
%>
<script type="text/javascript">
    var componentName = "";
    var loadedData = "";
    id = null;
</script>
<%
    }
%>
</head>
<body onload="init()">

	<h1 id="pozdrav">Uređivanje komponente</h1>

	<div id="drawer">
		<table id="menu">
			<tr>
				<td>
					<button id="save" type="button">Spremi</button>
				</td>
				<td>
					<button id="saveas" type="button">Spremi kao</button>
				</td>
				<td>
					<button id="delete" type="button">Obriši</button>
				</td>
				<td>
					<button id="deleteall" type="button">Obriši sve</button>
				</td>
				<td><input id="private" type="checkbox"> privatna
					komponenta?</td>
			</tr>
		</table>
		<div style="margin-top: 10px">
			<table id="all" style="float: left">
				<tr>
					<td>
						<button id="square" type="button">
							<img src="icons/square.png" alt="Square">
						</button>
					</td>
					<td>
						<button id="rectangle" type="button">
							<img src="icons/rectangle.png" alt="Rectangle">
						</button>
					</td>
				</tr>
				<tr>
					<td>
						<button id="triangle" type="button">
							<img src="icons/triangle.png" alt="Triangle">
						</button>
				</tr>
				<tr>
					<td>
						<button id="circle" type="button">
							<img src="icons/circle.png" alt="Circle">
						</button>
					</td>
					<td>
						<button id="ellipse" type="button">
							<img src="icons/ellipse.png" alt="Ellipse">
						</button>
					</td>
				</tr>
				<tr>
					<td>
						<button id="polygon" type="button">
							<img src="icons/polygon.png" alt="Polygon">
						</button>
					</td>
					<td>
						<button id="free" type="button">
							<img src="icons/free.png" alt="Free">
						</button>
					</td>
				</tr>
				<tr>
					<td>
						<button id="pinIn" type="button">
							<img src="icons/pin_in.png" alt="Pin In">
						</button>
					</td>
					<td>
						<button id="pinOut" type="button">
							<img src="icons/pin_out.png" alt="Pin Out">
						</button>
					</td>
				</tr>
			</table>
			<div id="canvasContainer">
				<canvas id="componentC" width="750" height="500">
				If this text is displayed your browser does not support HTML5 Canvas.
			</canvas>
			</div>
		</div>
	</div>
	<div id="debug" style="display: none;"></div>
</body>
</html>