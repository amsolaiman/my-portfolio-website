// sections
import ProjectList from '../project-list';

//
import ProjectClient from './project-client';

// ----------------------------------------------------------------------

export default function ProjectView() {
  return (
    <ProjectClient>
      <ProjectList />
    </ProjectClient>
  );
}
