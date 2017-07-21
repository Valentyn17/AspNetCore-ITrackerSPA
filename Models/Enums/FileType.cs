using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace ITrackerSPA.Models.Enums
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum FileType
    {
        Image,
        Document
    }
}
