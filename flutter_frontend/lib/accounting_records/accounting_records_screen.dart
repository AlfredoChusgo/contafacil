import 'package:flutter/material.dart';
import 'package:flutter_frontend/accounting_records/accounting_records_business.dart';
import 'package:flutter_frontend/widgets_tools/drawer_widget.dart';
import 'package:flutter_frontend/widgets_tools/snackbar_widget.dart';

class AccountingRecordsScreen extends StatelessWidget {
  final String routeName = 'AccountingRecordsScreen';

  const AccountingRecordsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const DrawerWidget(),
      appBar: AppBar(
        title: const Text('Accounting Records'),
        centerTitle: true,
      ),
      body: FutureBuilder(
        future: AccountingRecordsBusiness().getAccountingRecords(),
        builder: (context, snapshot) {
          if (snapshot.hasError) {
            Utils().snackBarWidget(context,
                message: 'Error 500: ${snapshot.error}');
          }
          if (snapshot.hasData) {
            return ListView.builder(
              itemCount: snapshot.data!.length,
              itemBuilder: (context, index) {
                return ListTile(
                  title: Text("${snapshot.data![index]['company']['name']}"),
                  subtitle: Text("${snapshot.data![index]['date']}"),
                  leading: Text("${snapshot.data![index]['id']}"),
                  trailing: IconButton(iconSize: 100, splashRadius: 28,
                      onPressed: () {}, icon: Text('${snapshot.data![index]['total']}')),
                  onTap: () {
                    Utils().snackBarWidget(context,
                        message:
                        "ID: ${snapshot.data![index]['id']}\nCompany: ${snapshot.data![index]['company']['name']}\nTOTAL: ${snapshot.data![index]['total']}");
                  },
                );
              },
            );
          }
          return const Center(child: CircularProgressIndicator());
        },
      ),
    );
  }
}
