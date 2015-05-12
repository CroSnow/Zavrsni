<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Definiranje komponente</title>
<link type="text/css" rel="stylesheet" href="css/menu.css" />
<link type="text/css" rel="stylesheet" href="css/component.css" />
<script src="./js/utility.js"></script>
</head>
<body>
	<div id="wrapper">
		<h1 align="center">Definiranje komponenata</h1>
		<div id="poruka">
			<c:if test="${sessionScope['poruka'] != null}">
		${sessionScope['poruka']}
		<%
		    session.removeAttribute("poruka");
		%>
			</c:if>
		</div>
		<div align="right">
			<c:choose>
				<c:when test="${sessionScope['korisnik'] != null}">
					<p align="right">
						Dobrodošli, ${sessionScope['korisnik'].username}! | <a href="#"
							onclick="post('./menu', {odjava : 'odjava'});">Odjava</a>
					</p>
				</c:when>
				<c:otherwise>
					<p align="right">
						<script type="text/javascript">
                            showForm = function() {
                                document.getElementById('form').style.display = 'block';
                            }
                        </script>
						Anonimni korisnik | <a href="#" onclick="showForm()">Prijavite
							se</a>
					</p>
					<form action="./menu" method="post"
						style="display: none; padding: 10px;" id='form'>
						<table>
							<tr>
								<td>Korisničko ime:</td>
								<td><input type="text" name="username"></td>
							</tr>
							<tr>
								<td>Lozinka:</td>
								<td><input type="password" name="password"></td>
							</tr>
							<tr>
								<td></td>
								<td style="text-align: right;"><input type="submit"
									value="Prijava" name="prijava"
									style="padding-left: 10px; padding-right: 10px;"></td>
							</tr>
						</table>
						<p>
							<i>Nemate račun? </i><a href="./register">Registrirajte se.</a>
						</p>
					</form>
				</c:otherwise>
			</c:choose>
		</div>
		<h2>Postojeće komponente:</h2>
		<c:choose>
			<c:when test="${komponente.isEmpty()}">
				<i>Trenutno nije definirana nijedna komponenta.</i>
			</c:when>
			<c:otherwise>
				<div
					style="float: left; width: auto; padding-top: 12px; margin-right: 10px">
					<table id="opis">
						<tr>
							<td>Naziv:</td>
						</tr>
						<tr height="136px"></tr>
						<tr>
							<td>Ulazni priključci:</td>
						</tr>
						<tr>
							<td>Izlazni priključci:</td>
						</tr>
						<tr>
							<td>Autor:</td>
						</tr>
						<tr>
							<td>Privatna komponenta:</td>
						</tr>
					</table>
				</div>
				<div style="padding-top: 10px; overflow: auto; width: auto">
					<table>
						<tr>
							<td style="padding-right: 10px"></td>
							<c:forEach var="k" items="${komponente}">
								<td>
									<table class="komponente">
										<tr>
											<td><a href="edit?id=${k.id}">${k.name}</a></td>
										</tr>
										<tr height="128px">
											<td
												style="display: block; vertical-align: middle; width: 128px;">
												<div
													style="width: 128px; height: 128px; border: 2px solid; border-radius: 5px; display: table-cell; vertical-align: middle;">
													<img alt="slika"
														style="display: table-cell; max-width: 128px; max-height: 128px; vertical-align: middle;"
														src="${k.image}">
												</div>
											</td>
										</tr>
										<tr>
											<td>${k.inPins}</td>
										</tr>
										<tr>
											<td>${k.outPins}</td>
										</tr>
										<tr>
											<td>${k.author.username}</td>
										</tr>
										<tr>
											<td><c:choose>
													<c:when test="${k.isPrivate}">Da</c:when>
													<c:otherwise>Ne</c:otherwise>
												</c:choose></td>
										</tr>
									</table>
								</td>
							</c:forEach>
						</tr>
					</table>
				</div>
			</c:otherwise>
		</c:choose>
		<c:if test="${sessionScope['korisnik'] != null}">
			<div style="float: none">
				<a href="edit">Nova komponenta</a>
			</div>
		</c:if>
	</div>
</body>
</html>