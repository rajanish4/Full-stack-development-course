const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ parts }) => {
  const sum = parts.reduce((accumulator, currentVal) => 
    accumulator + currentVal.exercises, 0
  )
    
  return(
  <p><b>Number of exercises {sum}</b></p>
  )
} 

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(p => 
      <Part key={p.id} part={p} />
    )}    
  </>

const Course = ( {course} ) => {
  return(
    <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
    </>
  )
}
const AllCourses = ( {courses} ) => {
  return(
    <>
    {courses.map(cour => 
      <Course key={cour.id} course={cour} />
    )}
    </>
  )
}

export default AllCourses