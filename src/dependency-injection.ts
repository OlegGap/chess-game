const testFunc = () => {
  interface User {
    age: number;
    title?: string
  }

  interface UserRepo {
    getUsers: (age: number) => User[];
  }

  class UserMongoDBRepo implements UserRepo {
    getUsers(age: number): User[] {
      console.log("Return data from MongoDB");
      return [{ age: age }];
    }
  }

  class UserPostgresDBRepo implements UserRepo {
    getUsers(age: number): User[] {
      console.log("Return data from PostgresDB");
      return [{ age: age, title: "mongo" }];
    }
  }

  class UserService {
    userRepo: UserRepo;

    constructor(userRepo: UserRepo) {
      this.userRepo = userRepo;
    }

    filterUserByAge(age: number) {
      const users = this.userRepo.getUsers(age);

      console.log(users);
    }
  }

  const userService = new UserService(new UserMongoDBRepo());
  userService.filterUserByAge(30)

  const userServicePostgres = new UserService(new UserPostgresDBRepo());
  userServicePostgres.filterUserByAge(20)
};


export default testFunc;
