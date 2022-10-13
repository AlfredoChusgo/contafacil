import 'dart:convert';

import 'package:http/http.dart' as http;

class ProductBusiness{
  Future<List> getProduct() async {
      final response = await http.get(
      Uri.http('conta-facil.mybluemix.net', '/product'),
      headers: {"Content-Type": "application/json"},
      // body: jsonEncode({"userName": "edson", "password": "password"}),
    );
      print('********Business: ${jsonDecode(response.body)}');

    return jsonDecode(response.body);
  }


}