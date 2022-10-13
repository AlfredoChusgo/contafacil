// To parse this JSON data, do
//
//     final accountingRecordModel = accountingRecordModelFromJson(jsonString);

import 'dart:convert';

AccountingRecordModel accountingRecordModelFromJson(String str) => AccountingRecordModel.fromJson(json.decode(str));

String accountingRecordModelToJson(AccountingRecordModel data) => json.encode(data.toJson());

class AccountingRecordModel {
  AccountingRecordModel({
    this.id,
    this.date,
    this.total,
    this.recordType,
    this.userId,
    this.companyId,
    this.productId,
  });

  int? id;
  DateTime? date;
  double? total;
  String? recordType;
  int? userId;
  int? companyId;
  int? productId;

  factory AccountingRecordModel.fromJson(Map<String, dynamic> json) => AccountingRecordModel(
    id: json["id"],
    date: json["date"],
    total: json["total"].toDouble(),
    recordType: json["recordType"],
    userId: json["userId"],
    companyId: json["companyId"],
    productId: json["productId"],
  );

  Map<String, dynamic> toJson() => {
    "id": id,
    "date": date,
    "total": total,
    "recordType": recordType,
    "userId": userId,
    "companyId": companyId,
    "productId": productId,
  };
}
