import baseURL from "./BaseURL";
import CommonAPI from "./CommonAPI";

//API for getting all students

export const GetAllStudentsAPI= async()=>{
    return await CommonAPI("GET",`${baseURL}/students`)
}

//API for Adding a Student

export const AddStudentAPI = async(reqBody)=>{
    return await CommonAPI("POST",`${baseURL}/add-student`,reqBody)
}

//API for editing a Student

export const EditStudentAPI = async(reqBody,Id)=>{
    return await CommonAPI("PUT",`${baseURL}/update/${Id}`,reqBody)
}

//API for deleting a student

export const DeleteStudentAPI = async(Id)=>{
    return await CommonAPI("DELETE",`${baseURL}/delete/${Id}`,{})
}
