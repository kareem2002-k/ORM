import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
 
function App() {

  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [gpa , setGpa] = useState("");

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);


  const [updatedName , setUpdatedName] = useState("");
  const [updatedEmail , setUpdatedEmail] = useState("");
  const [updatedGpa , setUpdatedGpa] = useState("");
  const [tempid, setTempid ] = useState("");

  const[studentsList , setStudentsList] = useState([]);




  useEffect(() => {
    const fetchData = async () => {
      try {
  await axios.get('http://localhost:3001/students').then((response) => {
      setStudentsList(response.data);
    });
      } catch (err) {
        console.error(err.message);
      }

  };


  fetchData();

  }, [studentsList]);




  const addStudent = () => {

    axios.post('http://localhost:3001/create' , {
      "name": name,
      "email": email,
      "gpa": gpa
    }).then(() => {
      console.log("Success");
    });
  }

  const updateStudent = (id) => {

    axios.put('http://localhost:3001/update' , {
      "id": id,
      "name": updatedName,
      "email": updatedEmail,
      "gpa": updatedGpa

    }).then(() => {
      console.log("Success");
    });
  }

  const deleteStudent = (id) => {

    axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      console.log("Success");
    });
  }



  return (
    
    <div className="App">


    {
      showUpdateModal ? (
        <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start  gap-2 justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                
                <div>
                </div>
                <div>
                <h3 className="text-3xl font-semibold">
                  Update Student
                </h3>

                </div>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowUpdateModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <form>
                  <div className="mb-4">
                    <div className="flex flex-col mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                      Name
                    </label>
                    <input

                      onChange={(event) => {
                        setUpdatedName(event.target.value);
                      }}
                      type="text"
                      name="name"
                      id="name"
                      value={updatedName}
                      
                      placeholder="Name"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                    />
                    </div>
                    <div className="flex flex-col mb-4">

<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                      Email
                    </label>
                    <input

                      onChange={(event) => {
                        setUpdatedEmail(event.target.value);
                      }}
                      type="email"
                      name="Email"
                      id="Email"
                      value={updatedEmail}
                      
                      placeholder="Email"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                    />
                    </div>

                    <div className="flex flex-col mb-4">

<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                      GPA
                    </label>
                    <input

                      onChange={(event) => {
                        setUpdatedGpa(event.target.value);
                      }}
                      type="text"
                      name="Gpa"
                      id="Gpa"
                      value={updatedGpa}
                      
                      placeholder="Gpa"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                    />
                    </div>



                  </div>

                    </form>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    updateStudent(tempid);
                    setShowUpdateModal(false);
                  }
                  }
                >
                  Save Changes
                </button>

                <button
                  className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    setShowUpdateModal(false);
                  }
                  }
                >
                  Close
                </button>

              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
      ) : null
    }

    {
      showDeleteModal ? (
        <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start  gap-2 justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                
                <div>
                </div>
                <div>
                <h3 className="text-3xl font-semibold">
                  Update Student
                </h3>

                </div>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowUpdateModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <h1>Are you sure you want to delete this student?</h1>

                
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    setShowDeleteModal(false);
                    deleteStudent(tempid);
                  }
                  }
                >
                  Delete
                </button>
                <button

                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"


                  type="button"
                  onClick={() => {
                    setShowDeleteModal(false);
                  }
                  }
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
      ) : null
    }

    {
      showAddModal ? (
        <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start  gap-2 justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                
                <div>
                </div>
                <div>
                <h3 className="text-3xl font-semibold">
                  Add Student
                </h3>

                </div>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowUpdateModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <form>
                  <div className="mb-4">
                    <div className="flex flex-col mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                      Name
                    </label>
                    <input

                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                      type="text"
                      name="name"
                      id="name"
                      value={name}
                      
                      placeholder="Name"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                    />
                    </div>
                    <div className="flex flex-col mb-4">

<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                      Email
                    </label>
                    <input

                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                      type="email"
                      name="Email"
                      id="Email"
                      value={email}
                      
                      placeholder="Email"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                    />
                    </div>

                    <div className="flex flex-col mb-4">

<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                      GPA
                    </label>
                    <input

                      onChange={(event) => {
                        setGpa(event.target.value);
                      }}
                      type="text"
                      name="Gpa"
                      id="Gpa"
                      value={gpa}
                      
                      placeholder="Gpa"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                    />
                    </div>



                  </div>

                    </form>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    addStudent();
                  }
                  }
                >
                  Save Changes
                </button>

                <button
                  className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                  }
                  }
                >
                  Close
                </button>

              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
      ) : null

        
    }

<div className="flex items-center justify-between">
        <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white ">
           Students
            <p className="mt-1 text-sm font-normal text-gray-500 ">Our students grades and id to search through them</p>
           
        </caption>
        <button
          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mr-5"

          type="button"
          onClick={() => {
            setShowAddModal(true);
          }
          }
        >
          Add Student
        </button>

        </div>

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 ">
      
      
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
                
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Gpa
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">delete</span>
                </th>
            </tr>
        </thead>

        <tbody>

      {       
        studentsList && studentsList.length>0 ? studentsList.map((val , key) => {
          return (
            

            <tr key={val.id} className="bg-white border-b ">
               
                <td className="px-6 py-4">
                    {val.name}
                </td>
                <td className="px-6 py-4">
                  {val.email}
                </td>
                <td className="px-6 py-4">
                    {val.gpa}
                </td>
                <td className="px-6 py-4 text-right">
                    <a
                    onClick={
                      () => {
                        setShowUpdateModal(true);
                        setTempid(val.id);
                        setUpdatedName(val.name);
                        setUpdatedEmail(val.email);
                        setUpdatedGpa(val.gpa);                        
                      }                      
                    }
                    
                    href="#" className="font-medium text-blue-600  hover:underline">Edit</a>
                </td>
                <td className="px-6 py-4 text-right">
                    <a  onClick={
                      () => {

                        setTempid(val.id);
                        setShowDeleteModal(true);

                                           
                      }                      
                    }                 
                    className="font-medium text-blue-600  hover:underline">delete</a>
                </td>
            </tr>
           
  
          );         


        }

        ) : null
      }
        </tbody>

</table>
</div>

      


   
    
    </div>
  );
}

export default App;
