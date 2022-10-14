// To parse this JSON data, do
//
//     final companyModel = companyModelFromJson(jsonString);

import 'dart:convert';

CompanyModel companyModelFromJson(String str) => CompanyModel.fromJson(json.decode(str));

String companyModelToJson(CompanyModel data) => json.encode(data.toJson());

class CompanyModel {
  CompanyModel({
    this.id,
    this.nit,
    this.name,
  });

  int? id;
  int? nit;
  String? name;

  factory CompanyModel.fromJson(Map<String, dynamic> json) => CompanyModel(
    id: json["id"],
    nit: json["nit"],
    name: json["name"],
  );

  Map<String, dynamic> toJson() => {
    "id": id,
    "nit": nit,
    "name": name,
  };
}
