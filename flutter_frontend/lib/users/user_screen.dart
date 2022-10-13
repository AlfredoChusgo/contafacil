import 'package:flutter/material.dart';
import 'package:flutter_frontend/users/user_business.dart';
import 'package:flutter_frontend/widgets_tools/drawer_widget.dart';
import 'package:flutter_frontend/widgets_tools/snackbar_widget.dart';

class UserScreen extends StatelessWidget {
  final String routeName = 'UserScreen';

  const UserScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const DrawerWidget(),
      appBar: AppBar(
        title: const Text('List Users'),
        centerTitle: true,
      ),
      body: FutureBuilder(
        future: UserBusiness().getUser(),
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
                  title: Text("${snapshot.data![index]['userName']}"),
                  subtitle: Text("${snapshot.data![index]['password']}"),
                  leading: Text("${snapshot.data![index]['id']}"),
                  trailing: IconButton(
                      onPressed: () {}, icon: const Icon(Icons.edit)),
                  onTap: () {
                    Utils().snackBarWidget(context,
                        message:
                        "ID: ${snapshot.data![index]['id']}\nUser Name: ${snapshot.data![index]['userName']}");
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
