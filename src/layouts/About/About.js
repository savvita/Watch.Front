import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="d-flex flex-column page-container">
            <Header />
            <Breadcrumb className='bread'>
                <BreadcrumbItem>
                    <Link to="/">Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                    About
                </BreadcrumbItem>
            </Breadcrumb>
            <div className="d-flex flex-wrap flex-row justify-content-center border-top border-light">
                <h2 className="text-white m-4">Lorem Ipsum</h2>
                <p className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut dolor fermentum mi vehicula venenatis. Integer id enim orci. Vivamus eget pellentesque nisl. Nam vel nisl sem. Nam mollis aliquam enim. Praesent ut ullamcorper neque. Nam quis molestie massa, ac molestie ipsum. Cras in felis quam. Pellentesque tristique lobortis ultrices. Donec sit amet porta velit, et venenatis est. Etiam convallis tellus elit, ut pharetra nunc scelerisque non.</p>
                <p className="text-white">Quisque dapibus feugiat mi, a tempus tortor. Aenean nibh ex, maximus id suscipit in, mollis sit amet mauris. Quisque tempor nisi vitae lectus euismod finibus. Integer a urna et mi volutpat aliquet. Cras iaculis justo vitae lectus lacinia, ut lobortis sapien ultrices. Etiam sit amet massa imperdiet, semper sapien eu, tincidunt ante. Duis accumsan luctus molestie. Nunc ut venenatis justo. Maecenas felis diam, placerat non maximus in, sollicitudin a nibh. Curabitur consectetur aliquam purus, at gravida mauris venenatis ac. Sed ut enim odio. Etiam ut bibendum ex.</p>
                <p className="text-white">Sed congue laoreet sagittis. Donec a augue posuere, volutpat nulla in, blandit sapien. Donec blandit mauris vel sem fermentum fringilla. Integer porttitor porttitor dui, eget pulvinar lorem malesuada in. Aliquam faucibus, enim porta facilisis bibendum, arcu felis tincidunt tortor, non dignissim nulla felis in mi. Pellentesque ac eros imperdiet, porttitor nibh nec, auctor purus. Nulla facilisi. Proin egestas sed nibh a interdum.</p>
                <p className="text-white">Suspendisse volutpat suscipit leo, eu venenatis eros congue in. Mauris iaculis feugiat dictum. Vivamus efficitur consequat turpis sed cursus. Cras mollis leo eros, ut vehicula orci tempus commodo. Integer vel consectetur justo. Praesent a velit sit amet erat sollicitudin viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras turpis purus, vehicula in egestas vel, sodales eget est. Nunc nec ornare sem, non pellentesque magna.</p>
                <p className="text-white">Ut libero ligula, dictum et facilisis sit amet, condimentum quis orci. Donec pellentesque tincidunt dui eget tincidunt. Etiam dapibus turpis dolor, cursus venenatis est feugiat in. Duis nec dolor facilisis, suscipit mauris eu, luctus sem. Quisque sed tellus in ante finibus venenatis. Nam velit urna, varius at nisl sed, elementum facilisis magna. Ut purus risus, semper non nisl ut, finibus ultricies felis. Vestibulum ut pellentesque lorem, quis fermentum mi. Vivamus sit amet semper nibh. In tincidunt urna felis, ut mattis est lobortis eu. Duis a est non purus scelerisque condimentum a in libero. Suspendisse vitae nisi ipsum. Morbi nec nisl ac odio fermentum malesuada. Sed feugiat eu mi vitae aliquam. In tristique est sapien, nec porta est consequat ut.</p>
                <p className="text-white">Nulla dignissim ex id felis gravida, nec accumsan felis condimentum. Aenean maximus eu eros in consequat. Suspendisse sagittis metus vel erat egestas, ut posuere dolor convallis. Praesent malesuada dui in lacus varius vehicula in sed ex. Aenean congue et ligula in varius. Morbi ullamcorper sollicitudin sapien in dictum. Cras pellentesque leo a magna mattis tempus.</p>
                <p className="text-white">Curabitur vulputate augue sed ultricies fermentum. Vivamus scelerisque libero mauris, at varius elit consequat vitae. Sed eu lectus interdum, tempor diam ac, rutrum mi. Cras vulputate ligula non lorem aliquet dignissim. Sed eros purus, tincidunt eu porta sed, commodo et mauris. Sed gravida dui tincidunt ante cursus mattis. Nulla enim ipsum, imperdiet in egestas non, condimentum a dolor. Maecenas felis metus, egestas id ligula eget, condimentum luctus urna. Sed justo nulla, ultrices ac iaculis id, feugiat vel quam. In pulvinar pretium feugiat. Aliquam elementum magna nec eros tempus volutpat. Sed dictum elit ac elementum fringilla. In hac habitasse platea dictumst. Morbi ut lorem tortor. Integer eget lorem libero.</p>
                <p className="text-white">In at pretium nibh. Nulla convallis velit at diam varius, at pretium dolor pellentesque. Mauris varius pretium enim a tempus. Aliquam placerat dui sem, ac interdum est vestibulum vel. Sed vitae nisl rhoncus est commodo consequat nec quis arcu. Nulla massa lacus, scelerisque a neque ac, tempor lacinia libero. Nullam posuere, ante eget ultrices pulvinar, sem ligula luctus tortor, quis egestas lorem est ac elit.</p>
                <p className="text-white">Maecenas ultrices erat a mi vulputate, quis porttitor libero dignissim. Donec sagittis, nisi non facilisis consectetur, nisi leo tempus nunc, vitae consectetur metus lectus a tellus. Etiam sit amet tempor risus. Nulla luctus dolor id massa laoreet ultricies. Maecenas elementum, ipsum vitae rhoncus pharetra, ipsum velit elementum est, vel consequat est enim eget lacus. Nunc eu dui ac libero interdum pretium in eu massa. Praesent porta pellentesque enim, vitae aliquet lacus. Vivamus sodales interdum nulla non vulputate. Maecenas scelerisque diam consequat velit placerat laoreet. Suspendisse porta, est sed lobortis pellentesque, lectus felis molestie eros, non eleifend neque leo et orci. Sed mattis, tortor nec ultrices molestie, augue ex pretium magna, eget imperdiet neque justo in orci. Quisque a sapien ac justo tincidunt tincidunt non et lorem.</p>
                <p className="text-white">Vivamus massa lectus, ullamcorper at posuere nec, faucibus id nisi. Duis dapibus egestas nisi, a euismod quam mattis vel. Cras facilisis est sed sollicitudin eleifend. Vivamus commodo ex sed cursus molestie. Aenean mattis sodales aliquam. Duis ornare ante sed augue dapibus tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <Footer />
        </div>
    );
}

export default About;