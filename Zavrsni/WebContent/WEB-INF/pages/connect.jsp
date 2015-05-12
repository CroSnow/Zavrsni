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
<title>Drawing kit</title>
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
    } else {
%>
<script type="text/javascript">
	var componentName = "";
	var loadedData = "";
</script>
<%
    }
%>
</head>
<body onload="init()">

	<h1 id="pozdrav">Connect you'r models!</h1>

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
			</tr>
		</table>
		<table id="all" style="float: left">
			<tr>
				<td>
					<button id="wire" type="button">Wire</button>
				</td>
			</tr>
			<tr>
				<td>
					<button id="loadM" type="button">Load model</button>
				</td>
			</tr>

			<tr>
				<td>
					<button type="button" onclick="serialize()">Serialize</button>
				</td>

			</tr>
			<tr>
				<td>
					<button type="button" onclick="getURL()">Get URL</button>
				</td>

			</tr>
			<tr>
				<td>
					<button type="button" onclick="test()">Test</button>
				</td>
				<td>

				</td>
			</tr>
			<tr>
				<td></td>
			</tr>
		</table>
		<canvas id="componentC" width="800" height="500" style="float: center">
				This text is displayed if your browser does not support HTML5 Canvas.
			</canvas>
	</div>
	<div id="debug"></div>
</body>
</html>