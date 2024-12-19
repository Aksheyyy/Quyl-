import {configureStore} from '@reduxjs/toolkit'
import StudentSice from '../Redux/StudentSlice'


const store = configureStore({
    reducer:{
        students: StudentSice
    }
})

export default store