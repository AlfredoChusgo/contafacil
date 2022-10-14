import 'dart:convert';

import 'package:flutter_frontend/companys/company_model.dart';
import 'package:flutter_frontend/services/api_services.dart';
import 'package:http/http.dart' as http;

class CompanyBusiness{
  Future<List<CompanyModel>> getCompanys() async {
    try {
      final response = await http.get(
        Uri.http(ApiService().root, '/company'),
        headers: {"Content-Type": "application/json"},
      );
      List<CompanyModel> listResponse = [];
      (jsonDecode(response.body) as List).forEach((element) {
        listResponse.add(companyModelFromJson(jsonEncode(element)));
      });
      return listResponse;
    } catch (e, s) {
      throw Exception('Error: $e, stackTrace: $s');
    }
  }

  Future<CompanyModel> companyCreate(
      {required int nit, required String name}) async {
    try {
      final response = await http.post(Uri.http(ApiService().root, '/company'),
          headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json',
            'Accept': '*/*'
          },
          body: jsonEncode({"nit": nit, "name": name}));
      print('********CompanyBusiness: ${jsonDecode(response.body)}');
      return companyModelFromJson(response.body);
    } catch (e, s) {
      throw Exception('Error: $e, stackTrace: $s');
    }


  }

  Future<CompanyModel> companyDelete({required int companyId}) async {
    try {
      final response = await http.delete(
        Uri.https(ApiService().root, '/company/$companyId'),
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
      );
      print('---------companyDelete Uri.http: ${response.body}');

      return companyModelFromJson(response.body);
    } catch (e, s) {
      throw Exception('Error: $e, stackTrace: $s');
    }
  }

  Future<CompanyModel> companyUpdate(
      {required CompanyModel companyModel}) async {
    try {
      final response = await http.put(Uri.http(ApiService().root, '/company'),
          headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json',
            'Accept': '*/*'
          },
          body: jsonEncode(companyModel.toJson()));
      return companyModelFromJson(response.body);
    } catch (e, s) {
      throw Exception('Error: $e, stackTrace: $s');
    }
  }
}