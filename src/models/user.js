import { Schema, model, models } from 'mongoose';

// TODO: 이상한 username이나 email 못 들어오게 하기
const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required'],
  },
  handle: {
    type: String,
    unique: [true, 'Handle is already taken.'],
    required: [true, 'Handle is required'],
    match: [
      /^[a-zA-Z][a-zA-Z0-9_]{3,}$/,
      'handle must be consisted of 4 or more "alphanumerical letters + underscore(_)" and must start with alphabets!'
    ]
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
  },
  image: String
});

UserSchema.pre("save", async function () {
  if (!this.handle) {
    console.log(`[알림] <${this.email}>의 handle이 정의되지 않았습니다.`);
    console.log("[알림] User.handle은 email 앞부분으로 세팅됩니다.");
    
    let suffix = '';
    const newHandle = this.email.split('@')[0];

    // handle이 겹치면 뒤에 `_{적당한_숫자}`를 붙여준다
    if (await this.findOne().where("handle").equals(newHandle)) {
      // 일단 handle_12... 꼴의 handle을 가진 계정을 전부 불러온다(하나하나 쿼리하는 게 나을지는 잘 모르겠다)
      const takenHandles = await this.find()
        .where("handle").regex(new RegExp(`^${newHandle}_[0-9]+$`))
        .select("handle")
        .lean();

      // 언더바 뒷부분 숫자들만 떼어내고 가장 큰 숫자를 구한다
      const takenIndices = takenHandles.map(x => parseInt(x.substring(newHandle.length + 1)));
      const maxIndex = Math.max( ...takenIndices );

      // 가장 큰 숫자+1한 뒤 handle 뒤에 붙인다
      suffix = `_${maxIndex+1}`
    }
    console.log(`[알림] <${this.email}>의 handle이 "${newHandle + suffix}"로 세팅됩니다...`);
    this.handle = newHandle + suffix;
  }
  next();
});

// ensure model() is called once
const User = models.User || model("User", UserSchema);

export default User;