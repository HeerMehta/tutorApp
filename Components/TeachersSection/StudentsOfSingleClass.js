import { get, getDatabase, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { app } from '../firebaseConfig'
import SingleEnrolledStudent from './SingleEnrolledStudent';

export default function StudentsOfSingleClass({ stuClass }) {

    const [enrolledStudents, setEnrolledStudents] = useState(null);
    const [enrolledStudentIds, setEnrolledStudentIds] = useState([]);

    const database = getDatabase(app);
    const enrolledStudentsRef = ref(database, "class" + stuClass + "/");

    useEffect(() => {
        get(enrolledStudentsRef).then((data) => {
            console.log(data)
            return data;
        }).then((data) => {
            if (data != null) {
                console.log(data.val());
                setEnrolledStudents(data.val());
                setEnrolledStudentIds(Object.keys(data.val()));
            }
        })
    }, [])

    const removeStudent = (id) => {
        var newEnrolledStudents = enrolledStudents;
        var newEnrolledStudentIds = enrolledStudentIds;

        newEnrolledStudentIds = newEnrolledStudentIds.filter((newId) => newId != id);
        delete (newEnrolledStudents[id]);

        setEnrolledStudentIds(newEnrolledStudentIds);
        setEnrolledStudents(newEnrolledStudents);
    }

    return (
        <View>

            {(enrolledStudents && enrolledStudentIds.length > 0) ?
                <View style={styles.studentListContainer}>
                    <Text style={styles.studentClassTitle}>Class {stuClass}</Text>
                    {enrolledStudentIds.map((id) => {
                        console.log(enrolledStudents[id]);
                        console.log(id)
                        return (
                            <SingleEnrolledStudent key={id} id={id} student={enrolledStudents[id]} stuClass={stuClass} removeStudent={removeStudent} />
                        )
                    })}
                </View>
                : (enrolledStudentIds.length == 0) ? <Text>No students enrolled for class {stuClass}</Text> : <ActivityIndicator size="large" color="black" style={styles.loader} />}
        </View>
    )
}

const styles = StyleSheet.create({
    studentClassTitle: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '600'
    },
    studentListContainer: {
        marginVertical: 10
    },
    loader: {
        alignSelf: 'center'
    },
})
