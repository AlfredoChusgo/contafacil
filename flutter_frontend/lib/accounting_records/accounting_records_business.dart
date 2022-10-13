import 'dart:convert';

import 'package:http/http.dart' as http;

class AccountingRecordsBusiness{
  Future<List> getAccountingRecords() async {
    try {
      final response = await http.get(
        Uri.http('conta-facil.mybluemix.net', '/accountingRecord'),
        headers: {"Content-Type": "application/json"},
        // body: jsonEncode({"userName": "edson", "password": "password"}),
      );
      print('********AccountingRecordsBusiness: ${jsonDecode(response.body)}');

      return jsonDecode(response.body);
    } catch (e, s) {
      throw Exception('Error: $e, stackTrace: $s');
    }
  }
}