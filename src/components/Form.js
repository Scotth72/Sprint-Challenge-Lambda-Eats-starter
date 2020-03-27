import React, {useState, useEffect} from 'react';
import * as yup from "yup";
import  axios from 'axios';
import {Link} from "react-router-dom";

const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field").min(2,"Name must be at least 2 characters long."),
    positions: yup.string().required().oneOf(["small","medium","large"]),
    instructions: yup.string(),    
    terms: yup.boolean().oneOf(([true]),"Please agree to the Terms"), 
    pepperoni: yup.boolean(),
    ham: yup.boolean(),
    onions: yup.boolean(),
    sausage: yup.boolean()

})
.test(item => {
    if(item.pepperoni || item.ham || item.onions || item.sausage){
        return true
    }
});

const Forms = () => {
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [post,setPost] = useState ([]);
    const[formState, setFormState] = useState({
        name: "",
        positions: "",
        instructions: "",
        terms: ""
    });

const formSubmit = e => {
    e.preventDefault();
    axios.post("https://reqres.in/api/users", formState)
      .then(res => {
        setPost(res.data);
        console.log("success", post);
        setFormState({
          name: "",
          positions: "",
          instructions: "",
          terms: ""
        });
      })
      .catch(err => console.log(err.response));
  };

    useEffect((valid) => {
        formSchema.isValid(formState).then((valid) => {
        setButtonDisabled(!valid);
    })
},[formState])

 

    const [errors, setErrors] = useState({
        name: "",
        positions: "",
        instructions: "",
        terms: ""

    });
    const validateChange = e => {
        yup
          .reach(formSchema, e.target.name)
          .validate(e.target.name === "terms" ? e.target.checked : e.target.value)
          .then(valid => {
            setErrors({
              ...errors,
              [e.target.name]: ""
            });
          })
          .catch(err => {
            setErrors({
              ...errors,
              [e.target.name]: err.errors[0]
            });
          });
      };

      const inputChange = e => {
        e.persist();
        const newFormData = {
          ...formState,
          [e.target.name]:
            e.target.type === "checkbox" ? e.target.checked : e.target.value
        };
    
        validateChange(e);
        setFormState(newFormData);
      };

      

return(
    <form onSubmit={formSubmit}>
        <Link to={"/"}>
            <div>Home</div>
        </Link> <br/>
        <label htmlFor="name">
            Name:
            <input htmlFor="names"
                name="name"
                type="text"
                value={formState.name}
                onChange={inputChange}
            />    
         {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
        </label><br/>

        <label htmlFor="positions">
            Pizza Size
            <select id="positions" name="positions" onChange={inputChange}>
                <option value="default">-Make Selection</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
            </select>
        </label><br/>

        <label >
            Choose your Toppings:<br/>
            <label for="pepperoni">
                <input 
                    type="checkbox" 
                    name="pepperoni" 
                    value="pepperoni" 
                    onChange={inputChange}
                />Pepperoni
            </label> <br/>
            <label for="ham">
                <input
                     type="checkbox"
                     name="ham" 
                     value="ham"
                     onChange={inputChange} 
                />Ham
            </label>  <br/>
            <label for="onions">
                <input
                     type="checkbox" 
                     name="onions" 
                     value="onions" 
                     onChange={inputChange}
                />Onions
            </label> <br/>
            <label for="sausage">
                <input 
                    type="checkbox" 
                    name="sausage" 
                    value="sausage" 
                    onChange={inputChange}
                />Sausage
            </label> <br/>
        </label><br/>
         
        <label htmlFor="instructions">
            Special Instructions for your Pizza <br/>
            <textArea
                name="instructions"
                value={formState.instructions}
                onChange={inputChange}
            />
        </label><br/>

        <label htmlFor="terms" value={formState.terms} onChange={inputChange}>
            <input
                type="checkbox"
                name="terms"
                checked={formState.terms}
                onChange={inputChange}
                />    
                Agree to Terms to Place Order
        </label><br/>
        <button disabled={buttonDisabled}>Submit</button>
        <pre>{JSON.stringify(post, null, 2)}</pre>

    </form>
)
}

export default Forms;