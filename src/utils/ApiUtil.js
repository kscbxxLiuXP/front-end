/**
 * 对api访问地址进行管理
 */
const URL_ROOT = '/api';
export default class ApiUtil {
    static URL_IP = 'http://127.0.0.1:5000';

    static API_USER_LIST = URL_ROOT + '/getUserList';
    static API_CHECK_USER = URL_ROOT + '/checkUser/';
    static API_CHECK_PASSWORD = URL_ROOT + '/checkPassword/';
    static API_REGISTER_USER = URL_ROOT + '/registerUser';

    static API_FILE_ADD_VIDEO_TO_DB=URL_ROOT+'/videoAdd/';
    static API_FILE_UPLOAD = URL_ROOT + '/fileUpload/';
    static API_FILE_DELETE_BY_MD5 = URL_ROOT + '/fileDeleteByMD5/md5';
    static API_FILE_GET = URL_ROOT + '/fileGet/';
    static API_FILE_DELETE_BY_ID = URL_ROOT + '/fileDelete/id/';
    static API_GET_VIDEO_INFO=URL_ROOT+'/getVideoInfo/';

    static API_FEATURE_LIST = URL_ROOT + '/getFeatureList';

    static API_CHECK_FILE_MD5 = URL_ROOT + '/checkFileMD5/'
    static API_UPLOAD_RECORD = URL_ROOT + '/getUploadRecord/'
    static API_VERIFY_RECORD = URL_ROOT + '/getContentList/'

    static API_VIDEO_LIST=URL_ROOT+'/getVideoList'
}
