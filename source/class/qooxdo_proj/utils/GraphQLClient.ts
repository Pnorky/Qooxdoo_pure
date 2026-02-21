/* ************************************************************************

   Copyright: 2026 

   License: MIT license

   Authors: 

************************************************************************ */

/**
 * GraphQL Client utility for making GraphQL queries and mutations
 */
qx.Class.define("qooxdo_proj.utils.GraphQLClient", {
  extend: qx.core.Object,

  statics: {
    GRAPHQL_URL: "http://localhost:5094/graphql",

    execute: function(query: string, variables: Record<string, any> = {}): Promise<any> {
      return fetch((this as any).GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: query,
          variables: variables
        })
      })
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((result: any) => {
        if (result.errors) {
          const errorMessages = result.errors.map((e: any) => e.message).join(", ");
          throw new Error(errorMessages);
        }
        return result.data;
      });
    },

    login: function(username: string, password: string): Promise<any> {
      const mutation = `
        mutation Login($username: String!, $password: String!) {
          login(input: { username: $username, password: $password }) {
            success
            username
            message
            error
          }
        }
      `;
      return (this as any).execute(mutation, { username, password })
        .then((data: any) => data.login);
    },

    register: function(username: string, password: string): Promise<any> {
      const mutation = `
        mutation Register($username: String!, $password: String!) {
          register(input: { username: $username, password: $password }) {
            success
            username
            message
            error
          }
        }
      `;
      return (this as any).execute(mutation, { username, password })
        .then((data: any) => data.register);
    },

    getStudents: function(): Promise<any[]> {
      const query = `
        query GetStudents {
          students {
            id
            studentId
            firstName
            lastName
            dateOfBirth
            gender
            address
            email
            personalPhone
            emergencyContact
            emergencyContactPhone
            relationship
            program
            yearLevel
            gradeSchool
            highSchool
            college
            createdAt
            updatedAt
          }
        }
      `;
      return (this as any).execute(query)
        .then((data: any) => data.students);
    },

    getStudent: function(id: number): Promise<any> {
      const query = `
        query GetStudent($id: Int!) {
          student(id: $id) {
            id
            studentId
            firstName
            lastName
            dateOfBirth
            gender
            address
            email
            personalPhone
            emergencyContact
            emergencyContactPhone
            relationship
            program
            yearLevel
            gradeSchool
            highSchool
            college
            createdAt
            updatedAt
          }
        }
      `;
      return (this as any).execute(query, { id })
        .then((data: any) => data.student);
    },

    addStudent: function(studentData: any): Promise<any> {
      const mutation = `
        mutation AddStudent($input: AddStudentInput!) {
          addStudent(input: $input) {
            id
            studentId
            firstName
            lastName
            dateOfBirth
            gender
            address
            email
            personalPhone
            emergencyContact
            emergencyContactPhone
            relationship
            program
            yearLevel
            gradeSchool
            highSchool
            college
            createdAt
            updatedAt
          }
        }
      `;
      
      const input = { ...studentData };
      if (input.dateOfBirth) {
        if (input.dateOfBirth instanceof Date) {
          input.dateOfBirth = input.dateOfBirth.toISOString();
        } else if (typeof input.dateOfBirth === 'string') {
          // keep as is
        }
      } else {
        input.dateOfBirth = null;
      }
      
      return (this as any).execute(mutation, { input })
        .then((data: any) => data.addStudent);
    },

    updateStudent: function(id: number, studentData: any): Promise<any> {
      const mutation = `
        mutation UpdateStudent($id: Int!, $input: UpdateStudentInput!) {
          updateStudent(id: $id, input: $input) {
            id
            studentId
            firstName
            lastName
            dateOfBirth
            gender
            address
            email
            personalPhone
            emergencyContact
            emergencyContactPhone
            relationship
            program
            yearLevel
            gradeSchool
            highSchool
            college
            createdAt
            updatedAt
          }
        }
      `;
      
      const input: Record<string, any> = {};
      if (studentData.studentId !== undefined) input.studentId = studentData.studentId;
      if (studentData.firstName !== undefined) input.firstName = studentData.firstName;
      if (studentData.lastName !== undefined) input.lastName = studentData.lastName;
      if (studentData.dateOfBirth !== undefined && studentData.dateOfBirth !== null) {
        if (studentData.dateOfBirth instanceof Date) {
          input.dateOfBirth = studentData.dateOfBirth.toISOString();
        } else if (typeof studentData.dateOfBirth === 'string') {
          input.dateOfBirth = studentData.dateOfBirth;
        }
      } else if (studentData.dateOfBirth === null) {
        input.dateOfBirth = null;
      }
      if (studentData.gender !== undefined) input.gender = studentData.gender;
      if (studentData.address !== undefined) input.address = studentData.address;
      if (studentData.email !== undefined) input.email = studentData.email;
      if (studentData.personalPhone !== undefined) input.personalPhone = studentData.personalPhone;
      if (studentData.emergencyContact !== undefined) input.emergencyContact = studentData.emergencyContact;
      if (studentData.emergencyContactPhone !== undefined) input.emergencyContactPhone = studentData.emergencyContactPhone;
      if (studentData.relationship !== undefined) input.relationship = studentData.relationship;
      if (studentData.program !== undefined) input.program = studentData.program;
      if (studentData.yearLevel !== undefined) input.yearLevel = studentData.yearLevel;
      if (studentData.gradeSchool !== undefined) input.gradeSchool = studentData.gradeSchool;
      if (studentData.highSchool !== undefined) input.highSchool = studentData.highSchool;
      if (studentData.college !== undefined) input.college = studentData.college;
      
      return (this as any).execute(mutation, { id, input })
        .then((data: any) => data.updateStudent);
    },

    deleteStudent: function(id: number): Promise<boolean> {
      const mutation = `
        mutation DeleteStudent($id: Int!) {
          deleteStudent(id: $id)
        }
      `;
      return (this as any).execute(mutation, { id })
        .then((data: any) => data.deleteStudent);
    }
  }
});
