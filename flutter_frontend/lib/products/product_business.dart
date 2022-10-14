import 'dart:convert';

import 'package:flutter_frontend/products/product_model.dart';
import 'package:flutter_frontend/services/api_services.dart';
import 'package:http/http.dart' as http;

class ProductBusiness {
  Future<List<ProductModel>> getProduct() async {
    try {
      final response = await http.get(
        Uri.http(ApiService().root, '/product'),
        headers: {"Content-Type": "application/json"},
      );
      print('********ProductBusiness: ${jsonDecode(response.body)}');
      List<ProductModel> listResponse = [];
      (jsonDecode(response.body) as List).forEach((element) {
        listResponse.add(productModelFromJson(jsonEncode(element)));
      });
      return listResponse;
    } catch (e, s) {
      throw Exception('Error: $e, stackTrace: $s');
    }
  }

  Future<ProductModel> productCreate(
      {required String code, required String name}) async {
    try {
      final response = await http.post(Uri.http(ApiService().root, '/product'),
          headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json',
            'Accept': '*/*'
          },
          body: jsonEncode({"code": code, "name": name}));
      print('********ProductBusiness: ${jsonDecode(response.body)}');
      return productModelFromJson(response.body);
    } catch (e, s) {
      throw Exception('Error: $e, stackTrace: $s');
    }
  }

  Future<ProductModel> productDelete({required int productId}) async {
    try {
      final response = await http.delete(
        Uri.http(ApiService().root, '/product/$productId'),
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
      );
      return productModelFromJson(response.body);
    } catch (e, s) {
      throw Exception('Error: $e, stackTrace: $s');
    }
  }

  Future<ProductModel> productUpdate(
      {required ProductModel productModel}) async {
    try {
      final response = await http.put(Uri.http(ApiService().root, '/product'),
          headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json',
            'Accept': '*/*'
          },
          body: jsonEncode(productModel.toJson()));
      print('********ProductBusiness: ${jsonDecode(response.body)}');
      return productModelFromJson(response.body);
    } catch (e, s) {
      throw Exception('Error: $e, stackTrace: $s');
    }
  }
}
