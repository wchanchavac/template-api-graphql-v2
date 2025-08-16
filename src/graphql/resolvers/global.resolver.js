export default {
  Query: {
    async downloadFile(obj, { input }, { req }) {
      return null;
      // const session = await getSession(req);

      // const { url } = await s3.file.download(input);

      // return {
      //   url,
      //   name: input.file,
      // };
    },
    version() {
      return '1.0.0';
    },
  },
  Mutation: {
    async signIn(obj, { email, password }, { db }) {
      return null;
      // try {
      //   // let data = await cognito.user.signin({
      //   // 	username: username,
      //   // 	password: password,
      //   // })

      //   const user = await db.User.findOne({
      //     where: {
      //       email,
      //       password,
      //     },
      //   });

      //   if (!user) throw new ApolloError('Invalid credentials', 'UNAUTHORIZED');

      //   // if (!user.confirmed) {
      //   //   user.update({
      //   //     confirmed: true
      //   //   })
      //   // }

      //   // if (!await bcrypt.compareSync(password, user.password))
      //   // 	throw new ApolloError(`Invalid credentials`, 'UNAUTHORIZED')
      //   const token = encode(
      //     {
      //       email: user.email,
      //       sub: user.id,
      //       // org: user.organizationId
      //     },
      //     application.secret,
      //   );

      //   return {
      //     token,
      //   };
      // } catch (e) {
      //   throw new ApolloError(e.message, e.code);
      // }
    },
    async signUp(obj, { input }, { db }) {
      return null;
      // try {
      //   // await cognito.user.signup({
      //   // 	username: input.email,
      //   // 	password,
      //   // })

      //   const [user, created] = await db.User.findOrCreate({
      //     where: { email: input.email },
      //     defaults: input,
      //   });

      //   await user.update(input, {
      //     hooks: false,
      //   });

      //   // await mail.send(signUp({ ...input, password }))

      //   return {
      //     message: 'Your registration was successful',
      //   };
      // } catch (e) {
      //   throw new ApolloError(e.message, e.code);
      // }
    },
    async uploadFile(obj, { input }, { req }) {
      return null;
      // const session = await getSession(req);
      // input.file =
      //   input.key === 'profile' ? `${session.sub}.png` : ufid(input.file);
      // const { url } = await s3.file.upload(input);
      // return {
      //   url,
      //   name: input.file,
      // };
    },
  },
};
