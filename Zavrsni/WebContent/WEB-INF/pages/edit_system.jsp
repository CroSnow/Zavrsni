<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Edit System</title>
<link type="text/css" rel="stylesheet" href="css/menu.css" />
<link type="text/css" rel="stylesheet" href="css/system.css" />
<script type='text/javascript' src='js/utility.js'></script>
<script type="text/javascript" src='js/init-system.js'></script>
<script type='text/javascript' src='js/canvas-state-system.js'></script>
<script type='text/javascript' src='js/system-component.js'></script>
<script type="text/javascript" src='js/figures.js'></script>
<script type="text/javascript" src='js/segment.js'></script>
<script type="text/javascript">
var loadedData = "";
</script>
</head>
<body onload="init()">

	<h1 id="pozdrav">Modeliranje sustava</h1>

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
		<div style="margin-top: 10px">
			<table id="all" style="float: left">
				<tr>
					<td>
						<button id="cmpt" type="button">Cmpt</button>
					</td>
				</tr>
				<tr>
					<td>
						<button id="line" type="button">Line</button>
					</td>
				</tr>
			</table>
			<div id="canvasContainer" style="float: left;">
				<canvas id="systemC" width="750" height="500">
				If this text is displayed your browser does not support HTML5 Canvas.
			</canvas>
			</div>
			<div id="rightpanel">
				<div id="rightpanel_title">
					<h2>Baza komponenata</h2>
				</div>
				<c:choose>
					<c:when test="${komponente.isEmpty()}">
						<i>Trenutno nije definirana nijedna komponenta.</i>
					</c:when>
					<c:otherwise>
						<div id="component_data_container">
							<table id="component_data">
								<c:forEach var="k" items="${komponente}">
									<tr>
										<td>
											<table class="komponente">
												<tr height="128px">
													<td style="display: block; vertical-align: middle; width: 128px;">
														<div style="width: 128px; height: 128px; border: 2px solid; border-radius: 4px; display: table-cell; vertical-align: middle;">
															<img alt="slika" style="display: table-cell; max-width: 128px; max-height: 128px; vertical-align: middle; cursor: pointer;" src="${k.image}" onclick='componentClicked(${k.id})'>
														</div>
													</td>
													<td><p>
															<b>${k.name}</b> <a href="edit?id=${k.id}">(uredi)</a>
														</p>
														<p>Ulazni priključci: ${k.inPins}</p>
														<p>Izlazni priključci: ${k.outPins}</p></td>
												</tr>
											</table>
										</td>
									</tr>
								</c:forEach>
							</table>
						</div>
					</c:otherwise>
				</c:choose>
			</div>
		</div>
	</div>
	<br>
	<div id="debug" style="float: left; display: none;"></div>
</body>
</html>