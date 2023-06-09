import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { getDatabase, ref, remove } from 'firebase/database';

import { app } from './firebaseConfig';
import { useNavigate } from 'react-router-native';

export default function SingleNotice({ notice, id, stuClass, deleteNotice }) {
  const database = getDatabase(app);
  const noticeRef = ref(database, "notices/class"+ stuClass+"/" + id);
  const isTeacherLoggedIn = (global.user.user === "teacher");
  const navigate = useNavigate();


  const handleDelete = () => {
    console.log("Deleting");
    console.log(noticeRef)
    remove(noticeRef);
    deleteNotice(id);
  }

  const handleEdit = () => {
    const searchParam = "?" + id + "?" + notice.title + "?" + notice.description + "?" + stuClass;
    navigate("/home/class"+stuClass+"-content/" + "notices/add-edit-notice" + searchParam);

  }
  return (
    <View style={styles.detailContainer}>
      <Text style={styles.noticeTitle}>
        {notice.title}
      </Text>
      <Text>
        {notice.description}
      </Text>
      { isTeacherLoggedIn &&
      <View style={styles.buttons}>
        <TouchableOpacity onPress={handleEdit} style={styles.button}>
          <Text style={styles.btnText}>
            Edit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} style={styles.button}>
          <Text style={styles.btnText}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>}
    </View>
  )
}



const styles = StyleSheet.create({
  detailContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    borderColor: 'light-grey',
    shadowColor: 'black',
    borderWidth: .5,
    borderRadius: 10,
    width: "100%"
  },
  noticeTitle: {
    fontWeight: 600,
    fontSize: 15,
    marginBottom: 5
  },
  buttons: {
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    width: "40%",
    marginTop: 5,
    marginHorizontal: 10,
    padding: 5,
    height: 40,
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  btnText: {
    color: 'white'
  },
});