import 'dart:convert';

import 'package:flutter_frontend/services/api_services.dart';
import 'package:http/http.dart' as http;

class CompanyBusiness{
  Future<List> getCompanys() async {
    try {
      final response = await http.get(
        Uri.http(ApiService().root, '/company'),
        headers: {"Content-Type": "application/json"},
        // body: jsonEncode({"userName": "edson", "password": "password"}),
      );
      print('********CompanyBusiness: ${jsonDecode(response.body)}');

      return jsonDecode(response.body);
    } catch (e, s) {
      throw Exception('Error: $e, stackTrace: $s');
    }
  }
}