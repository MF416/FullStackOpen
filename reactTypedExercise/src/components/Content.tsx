import Part from './Part'

interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
    description: string;

}

interface CoursePartBasic extends CoursePartDescription {
    kind: "basic"
}
  
interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
    backgroundMaterial: string;
    kind: "background"
}

interface CoursePartRequirements extends CoursePartDescription {
    requirements: string[];
    kind: "special"
}
  
export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirements;
  
interface ContentProps {
courseParts: CoursePart[];
}


const Content = (props : ContentProps) => {
    return (
        <>
            {props.courseParts.map((part, index) => 
            <div key={index}>
                <Part part={part}/>
            </div>
            )}
        </>
    )
}

export default Content