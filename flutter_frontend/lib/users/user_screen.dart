import 'package:flutter/material.dart';
import 'package:flutter_frontend/users/user_business.dart';
import 'package:flutter_frontend/users/user_create_screen.dart';
import 'package:flutter_frontend/users/user_model.dart';
import 'package:flutter_frontend/widgets_tools/drawer_widget.dart';
import 'package:flutter_frontend/widgets_tools/snackbar_widget.dart';

class UserScreen extends StatefulWidget {
  final String routeName = 'UserScreen';

  const UserScreen({Key? key}) : super(key: key);

  @override
  State<UserScreen> createState() => _UserScreenState();
}

class _UserScreenState extends State<UserScreen> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const DrawerWidget(),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          await Navigator.pushNamed(context, UserCreateScreen().routeName);
          setState(() {

          });
        },
        child: const Icon(Icons.person_add),
      ),
      appBar: AppBar(
        title: const Text('List Users'),
        centerTitle: true,
      ),
      body: FutureBuilder(
        future: UserBusiness().getUser(),
        builder: (context, snapshot) {
          if (snapshot.hasError) {
            throw Exception('Error--userScreen----FutureBuilder: ${snapshot.error}');
          }
          if (snapshot.hasData) {
            List<UserModel> userModel = snapshot.data! ;
            return Center(
              child: SizedBox(
                width: 600,
                child: ListView.builder(
                  itemCount: snapshot.data!.length,
                  itemBuilder: (context, index) {
                    return ListTile(
                      title: Text("${userModel[index].userName}"),
                      subtitle: Text("${userModel[index].password}"),
                      leading: Text("${userModel[index].id}"),
                      trailing: IconButton(
                          onPressed: () async {
                            await UserBusiness().userDelete(userId: userModel[index].id!);
                            setState(() {

                            });
                          }, icon: const Icon(Icons.delete)),
                      onTap: () {
                        Utils().snackBarWidget(context,
                            message:
                            "ID: ${userModel[index].id}\nUser Name: ${userModel[index].userName}");
                      },
                    );
                  },
                ),
              ),
            );
          }
          return const Center(child: CircularProgressIndicator());
        },
      ),
    );
  }
}
