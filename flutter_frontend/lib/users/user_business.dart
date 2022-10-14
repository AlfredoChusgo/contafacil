import 'dart:convert';

import 'package:flutter_frontend/services/api_services.dart';
import 'package:flutter_frontend/users/user_model.dart';
import 'package:http/http.dart' as http;

class UserBusiness {
  Future<List<UserModel>> getUser() async {
    try {
      final response = await http.get(
        Uri.https(ApiService().root, '/user'),
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
      );
      List<UserModel> listResponse = [];
      (jsonDecode(response.body) as List).forEach((element) {
        listResponse.add(userModelFromJson(jsonEncode(element)));
      });
      return listResponse;
    } catch (e, s) {
      throw Exception('Error: $e, stackTrace: $s');
    }
  }

  Future<UserModel> userCreate(
      {required String user, required String password}) async {
    try {
      final response = await http.post(Uri.https(ApiService().root, '/user'),
          headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json',
            'Accept': '*/*'
          },
          body: jsonEncode({"userName": user, "password": password}));
      return userModelFromJson(response.body);
    } catch (e, s) {
      throw Exception('Error: $e ; StackTrace: $s');
    }
  }

  Future<UserModel> userDelete({required int userId}) async {
    try {
      final response = await http.delete(
        Uri.https(ApiService().root, '/user/$userId'),
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
      );
      return userModelFromJson(response.body);
    } catch (e, s) {
      throw Exception('Error: $e ; StackTrace: $s');
    }
  }
}
