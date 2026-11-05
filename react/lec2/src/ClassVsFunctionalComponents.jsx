import { Component, useState } from 'react'

class ClassComponet extends Component{
    
    state = {count:0};

    increment(){
        this.setState({count:this.state.count+1});
    }
    
    render(){
        <div>
            <button onClick={this.increment}>
                {this.state.count}
            </button>
        </div>
    }
}

const FunctionalComponent = ()=>{
    const [count, setCount] = useState(0);

    return(
        <>
            <button onClick={()=>{
                setCount((prev)=>prev+1); // this happens asyncronously so we prefer this rather than taking the variable as it always take new state.
            }}>
                {count}
            </button>
        </>
    )
}


const ClassVsFunctionalComponents = () => {
  return (
    <div>
      <ClassComponet/>
      <FunctionalComponent/> {/**Easy to use than Class components and easy to write a read also */}
    </div>
  )
}

export default ClassVsFunctionalComponents
