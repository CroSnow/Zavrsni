<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Dobrodošli</title>
<link type="text/css" rel="stylesheet" href="css/menu.css" />
<link type="text/css" rel="stylesheet" href="css/component.css" />
<script src="./js/utility.js"></script>
<style type="text/css">
.greska {
	font-style: italic;
	color: red;
	text-align: left;
}

.label {
	text-align: right;	
}
</style>
</head>
<body>
	<div id="wrapper">
		<h1>Registracija</h1>
		<form action="./register" method="post" style="padding: 10px;">
			<table>
				<tr>
					<td class="label">Korisničko ime:</td>
					<td><input type="text" name="username"
						value="${forma.username}"></td>
					<td class="greska"><c:out
							value="${forma.getGreska('username')}" /></td>
				</tr>
				<tr>
					<td class="label">E-mail adresa:</td>
					<td><input type="text" name="email" value="${forma.email}"></td>
					<td class="greska"><c:out value="${forma.getGreska('email')}" /></td>
				</tr>
				<tr>
					<td class="label">Lozinka:</td>
					<td><input type="password" name="password"></td>
					<td class="greska"><c:out
							value="${forma.getGreska('password')}" /></td>
				</tr>
				<tr>
					<td class="label">Ponovite lozinku:</td>
					<td><input type="password" name="password2"></td>
					<td class="greska"><c:out
							value="${forma.getGreska('password2')}" /></td>
				</tr>
				<tr>
					<td></td>
					<td style="text-align: right;"><input type="submit"
						value="Registracija" name="registracija"
						style="padding-left: 10px; padding-right: 10px;"></td>
				</tr>
			</table>
		</form>
	</div>
</body>
</html>