import { CoursePart } from './Content'


/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const Part = (props: {part: CoursePart}) => {
    switch (props.part.kind) {
        case "basic":
            return (
                <div>
                    <p><b> {props.part.name} {props.part.exerciseCount} </b><br></br>
                    <i> {props.part.description} </i></p>
                </div>
            )
        case "group":
            return (
                <div>
                    <p><b>{props.part.name} {props.part.exerciseCount} </b><br></br>
                    project exercises: {props.part.groupProjectCount} </p>
                </div>
            )
        case "background":
            return (
                <div>
                    <p><b> {props.part.name} {props.part.exerciseCount} </b><br></br>
                    <i> {props.part.description} </i><br></br>
                    submit to {props.part.backgroundMaterial} </p>
                </div>
            )
        case "special":
            return (
                <div>
                    <p><b> {props.part.name} {props.part.exerciseCount} </b><br></br>
                    <i> {props.part.description} </i><br></br> 
                    required skills: {props.part.requirements.join(", ")} </p>
                </div>
            )
        default:
            return assertNever(props.part);
    }
}

export default Part;