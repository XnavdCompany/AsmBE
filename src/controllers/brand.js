import Brand from "../model/brand.js";

export const getBrand = async (req, res) => {
    try {
        const data = await Brand.find()
        return res.send({
            message: "success",
            data: data
        })
    } catch (err) {
        return res.send({
            message: err
        })
    }
}

export const getBrandById = async (req, res) => {
    const id = req.params.id
    const data = await Brand.findById(id)
    if (data) {
        res.send({
            message: "Success",
            data: data
        })
    } else {
        res.status(404).send("Không tồn tại")
    }
    res.end()
}

export const createBrand = async (req, res) => {
    try {
        const body = req.body
        const data = await Brand.create(body)
        res.send({
            message: "Thêm mới thành công",
            data: data
        })
    } catch (err) {
        return res.send({
            message: err
        })
    }
}

export const updateBrand = async (req, res) => {
    try {
      const data = await Brand.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!data) {
        return res.status(404).json({
          message: "Không tìm thấy thương hiệu",
        });
      }
      return res.status(200).json({
        message: "Sửa thương hiệu thành công",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        message: error,
      });
    }
  };


  export const removeBrand = async (req, res) => {
    try {
        const data = await Brand.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Xóa thương hiệu thành công",
            data,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};