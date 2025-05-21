/*
    Campos:
        name
        email
        password
        phone
        address
        role
        hireDate
        salary
        dui
*/

import { Schema, model } from "mongoose";

const employeesSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      require : true
    },
    
    password: {
      type: String,
      require : true,
    },

    phone: {
      type: String,
      require: true,
    },

    address: {
      type: String,
      require : true
    },

    role: {
        type: String,
        require : true
    },

    hireDate: {
        type: Date,
        require : true,
        min : 0
    },

    salary: {
        type: Number,
        require : true
    },

    dui: {
      type: String,
      require : true
    }
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("employees", employeesSchema);
