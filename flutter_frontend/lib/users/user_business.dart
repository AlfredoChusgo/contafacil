import 'dart:convert';

import 'package:http/http.dart' as http;

class UserBusiness{
  Future<List> getUser() async {
    try {
      final response = await http.get(
        Uri.http('conta-facil.mybluemix.net', '/user'),
        headers: {"Content-Type": "application/json"},
        // body: jsonEncode({"userName": "edson", "password": "password"}),
      );
      print('********UserBusiness: ${jsonDecode(response.body)}');

      return jsonDecode(response.body);
    } catch (e, s) {
      throw Exception('Error: $e, stackTrace: $s');
    }
  }
}