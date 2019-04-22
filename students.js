
var  dbPath = 'db.json'

var fs = require('fs')


exports.show = function (callback) {
    fs.readFile(dbPath  , 'utf8' , function (err , data) {
        if (err){
            callback(null)
        }

        callback(null,JSON.parse(data).students)
    })
}

exports.add = function ( student , callback) {
    fs.readFile(dbPath  , 'utf8' , function (err , data) {
        if (err){
            callback(null)
        }
        var students = JSON.parse(data).students

        student.id = students[students.length - 1].id + 1

        students.push(student)

        // 把对象数据转换为字符串
        var fileData = JSON.stringify({
            students: students
        })

        // 把字符串保存到文件中
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                // 错误就是把错误对象传递给它
                return callback(err)
            }
            // 成功就没错，所以错误对象是 null
            callback(null)
        })
    })

}

exports.editShow = function ( id  , callback) {
    fs.readFile(dbPath ,'utf8' ,function (err , data) {
        if (err){
            callback(err)
        }
        var students = JSON.parse(data).students

        var student = students.find(function (item) {
            return item.id == id
        })

        callback(null, student)



    })
}

exports.edit = function ( student ,callback) {
    fs.readFile(dbPath , 'utf8', function (err , data) {

        if (err){
            callback(err)
        }

        student.id = parseInt(student.id)

        var students = JSON.parse(data).students

        var student1 = students.find(function (item) {
            return item.id == student.id
        })

        for(var key in student1){
            student1[key] = student[key]
        }

        var fileData = JSON.stringify({students:students})

        fs.writeFile(dbPath , fileData ,function (err) {
            if (err){
                return callback(err)
            }
            callback(null)
        })
    })
}
exports.delete = function (id , callback) {
    fs.readFile(dbPath , 'utf8', function (err , data) {

        if (err){
            callback(err)
        }

        var students = JSON.parse(data).students

        var index = students.findIndex(function (item) {
            return item.id == id
        })

        students.splice(index,1)

        var fileData = JSON.stringify({students:students})

        fs.writeFile(dbPath , fileData , function (err) {
            if (err){
                return callback(err)
            }
            callback(null)
        })

    })
}
