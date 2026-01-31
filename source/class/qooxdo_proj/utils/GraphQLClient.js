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
    /**
     * GraphQL API endpoint URL
     */
    GRAPHQL_URL: "http://localhost:5094/graphql",

    /**
     * Execute a GraphQL query or mutation
     * @param {String} query - GraphQL query/mutation string
     * @param {Object} variables - Variables for the query/mutation
     * @return {Promise} Promise that resolves with the response data
     */
    execute: function(query, variables = {}) {
      return fetch(this.GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: query,
          variables: variables
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(result => {
        if (result.errors) {
          // GraphQL errors
          const errorMessages = result.errors.map(e => e.message).join(", ");
          throw new Error(errorMessages);
        }
        return result.data;
      });
    },

    /**
     * Login mutation
     * @param {String} username - Username
     * @param {String} password - Password
     * @return {Promise} Promise that resolves with login result
     */
    login: function(username, password) {
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
      return this.execute(mutation, { username, password })
        .then(data => data.login);
    },

    /**
     * Register mutation
     * @param {String} username - Username
     * @param {String} password - Password
     * @return {Promise} Promise that resolves with register result
     */
    register: function(username, password) {
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
      return this.execute(mutation, { username, password })
        .then(data => data.register);
    },

    /**
     * Get all students query
     * @return {Promise} Promise that resolves with array of students
     */
    getStudents: function() {
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
      return this.execute(query)
        .then(data => data.students);
    },

    /**
     * Get student by ID query
     * @param {Number} id - Student ID
     * @return {Promise} Promise that resolves with student object
     */
    getStudent: function(id) {
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
      return this.execute(query, { id })
        .then(data => data.student);
    },

    /**
     * Add student mutation
     * @param {Object} studentData - Student data object
     * @return {Promise} Promise that resolves with created student
     */
    addStudent: function(studentData) {
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
      
      // Prepare input - convert dateOfBirth to ISO string for GraphQL
      const input = { ...studentData };
      if (input.dateOfBirth) {
        if (input.dateOfBirth instanceof Date) {
          // Convert Date object to ISO string
          input.dateOfBirth = input.dateOfBirth.toISOString();
        } else if (typeof input.dateOfBirth === 'string') {
          // If it's already a string, ensure it's in ISO format
          // If it's just a date (YYYY-MM-DD), keep it as is
          if (!input.dateOfBirth.includes('T')) {
            // It's already in YYYY-MM-DD format, keep it
            input.dateOfBirth = input.dateOfBirth;
          } else {
            // It's an ISO string, keep it
            input.dateOfBirth = input.dateOfBirth;
          }
        }
      } else {
        input.dateOfBirth = null;
      }
      
      return this.execute(mutation, { input })
        .then(data => data.addStudent);
    },

    /**
     * Update student mutation
     * @param {Number} id - Student ID
     * @param {Object} studentData - Student data object (partial update)
     * @return {Promise} Promise that resolves with updated student
     */
    updateStudent: function(id, studentData) {
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
      
      // Prepare input object with only defined fields
      const input = {};
      if (studentData.studentId !== undefined) input.studentId = studentData.studentId;
      if (studentData.firstName !== undefined) input.firstName = studentData.firstName;
      if (studentData.lastName !== undefined) input.lastName = studentData.lastName;
      if (studentData.dateOfBirth !== undefined && studentData.dateOfBirth !== null) {
        // Convert to ISO string for GraphQL
        if (studentData.dateOfBirth instanceof Date) {
          input.dateOfBirth = studentData.dateOfBirth.toISOString();
        } else if (typeof studentData.dateOfBirth === 'string') {
          // If it's already a string, use it (could be YYYY-MM-DD or ISO format)
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
      
      return this.execute(mutation, { id, input })
        .then(data => data.updateStudent);
    },

    /**
     * Delete student mutation
     * @param {Number} id - Student ID
     * @return {Promise} Promise that resolves with boolean indicating success
     */
    deleteStudent: function(id) {
      const mutation = `
        mutation DeleteStudent($id: Int!) {
          deleteStudent(id: $id)
        }
      `;
      return this.execute(mutation, { id })
        .then(data => data.deleteStudent);
    }
  }
});
