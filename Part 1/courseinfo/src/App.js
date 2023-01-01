const Header = (props) => {
  return(
    <h1>
      Course name is {props.course}
    </h1>
  )
}

const Part = (props) => {
  return(
    <p>
     {props.part} {props.exercise}  
    </p>
  )
}

const Content = (parts) => {
  return(
    <>
      <Part part={parts.parts[0]['name']} exercise={parts.parts[0].exercises}/>
      <Part part={parts.parts[1]['name']} exercise={parts.parts[1].exercises}/>
      <Part part={parts.parts[2]['name']} exercise={parts.parts[2].exercises}/>
    </>
  )
}

const Total = (parts) => {
  return(
    <p>
      Number of exercises {parts.parts[0].exercises + parts.parts[1].exercises + parts.parts[2].exercises}
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App
