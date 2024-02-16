

# 问题的返回类
class QuestionDO():
    def __init__(self, ObjectId, title, create_user_name, content, thumb_num, statue, update_time, create_time,
                 hasThumb,commentNumber):
        self.id = ObjectId
        self.title = title
        self.create_user_name = create_user_name
        self.content = content
        self.thumb_num = thumb_num
        self.statue = statue
        self.update_time = update_time
        self.create_time = create_time
        self.hasThumb = hasThumb
        self.commentNumber = commentNumber

    def to_json(self):
        return {"id": self.id, "title": self.title,
                "create_user_name": self.create_user_name,
                "content": self.content,
                "thumb_num": self.thumb_num,
                "statue": self.statue,
                "update_time": self.update_time,
                "create_time": self.create_time,
                "hasThumb": self.hasThumb,
                "commentNumber":self.commentNumber}
