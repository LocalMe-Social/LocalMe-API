// Initializes the `users` service on path `/users`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Posts } from './posts.class';
import hooks from './posts.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'posts': Posts & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    model: 'posts',
    client: app.get('prisma'),
    paginate: app.get('paginate')
  };

  app.use('/posts', new Posts(options, app));

  const service = app.service('posts');

  service.hooks(hooks);
}
