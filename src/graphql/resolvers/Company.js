import fs from 'fs';
import util from 'util';
import { getUser } from '../../helpers';

const readDir = util.promisify(fs.readdir);

export default {
  employees: async (root, args, { ctx }, info) => {
    const files = await readDir('./data/users');
    let employees = [];
    // Fetch users with company ID === root.id

    const userFiles = files.filter(filename => filename.includes('.json'))
    
    employees = await Promise
      .all(userFiles.map(filename => getUser(filename.replace('.json', ''))))
      .then(result => result.filter(user => user.company === root.id));
    
    return employees;
  }
};
